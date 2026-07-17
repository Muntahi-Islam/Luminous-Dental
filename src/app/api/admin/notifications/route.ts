import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const [pendingAppointments, newInquiries, recentNewsletters] = await Promise.all([
      prisma.appointment.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.contactInquiry.findMany({
        where: { status: "new" },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      prisma.newsletter.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ])

    const notifications = [
      ...pendingAppointments.map((a) => ({
        id: a.id,
        type: "appointment" as const,
        title: `New appointment from ${a.patientName}`,
        description: `${a.reason} on ${a.preferredDate}`,
        link: "/admin/appointments",
        createdAt: a.createdAt.toISOString(),
        read: false,
      })),
      ...newInquiries.map((i) => ({
        id: i.id,
        type: "inquiry" as const,
        title: `New inquiry from ${i.name}`,
        description: i.subject,
        link: "/admin/patients",
        createdAt: i.createdAt.toISOString(),
        read: false,
      })),
      ...recentNewsletters.map((n) => ({
        id: n.id,
        type: "newsletter" as const,
        title: `New subscriber: ${n.email}`,
        description: "Signed up for newsletter",
        link: "/admin/settings",
        createdAt: n.createdAt.toISOString(),
        read: false,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)

    const unreadCount =
      pendingAppointments.length + newInquiries.length + recentNewsletters.length

    return NextResponse.json({
      success: true,
      data: { notifications, unreadCount },
    })
  } catch (error) {
    console.error("Failed to fetch notifications:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}
