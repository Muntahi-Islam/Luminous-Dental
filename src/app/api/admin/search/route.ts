import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")?.trim()
    if (!q) {
      return NextResponse.json(
        { success: false, error: "Search query is required" },
        { status: 400 },
      )
    }

    const [appointments, inquiries, blogs, doctors, services] = await Promise.all([
      prisma.appointment.findMany({
        where: {
          OR: [
            { patientName: { contains: q } },
            { patientEmail: { contains: q } },
            { reason: { contains: q } },
          ],
        },
        take: 3,
      }),
      prisma.contactInquiry.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { subject: { contains: q } },
          ],
        },
        take: 3,
      }),
      prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
          ],
        },
        take: 3,
      }),
      prisma.doctor.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { title: { contains: q } },
            { specializations: { contains: q } },
          ],
        },
        take: 3,
      }),
      prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { shortDescription: { contains: q } },
          ],
        },
        take: 3,
      }),
    ])

    const results = [
      ...appointments.map((a) => ({
        type: "appointment" as const,
        id: a.id,
        title: a.patientName,
        subtitle: `${a.reason} — ${a.preferredDate}`,
        link: "/admin/appointments",
      })),
      ...inquiries.map((i) => ({
        type: "inquiry" as const,
        id: i.id,
        title: i.name,
        subtitle: i.subject,
        link: "/admin/patients",
      })),
      ...blogs.map((b) => ({
        type: "blog" as const,
        id: b.id,
        title: b.title,
        subtitle: b.excerpt,
        link: "/admin/blog",
      })),
      ...doctors.map((d) => ({
        type: "doctor" as const,
        id: d.id,
        title: d.name,
        subtitle: `${d.title} — ${d.specializations}`,
        link: "/admin/doctors",
      })),
      ...services.map((s) => ({
        type: "service" as const,
        id: s.id,
        title: s.title,
        subtitle: s.shortDescription,
        link: "/admin/services",
      })),
    ]

    return NextResponse.json({
      success: true,
      data: { results, total: results.length },
    })
  } catch (error) {
    console.error("Failed to search:", error)
    return NextResponse.json({ success: false, error: "Failed to search" }, { status: 500 })
  }
}
