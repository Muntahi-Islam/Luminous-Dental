import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const [
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      totalDoctors,
      totalServices,
      totalBlogPosts,
      totalInquiries,
      newInquiries,
      totalTestimonials,
      totalNewsletters,
      recentAppointments,
      recentInquiries,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "pending" } }),
      prisma.appointment.count({ where: { status: "confirmed" } }),
      prisma.appointment.count({ where: { status: "completed" } }),
      prisma.doctor.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.contactInquiry.count(),
      prisma.contactInquiry.count({ where: { status: "new" } }),
      prisma.testimonial.count(),
      prisma.newsletter.count({ where: { active: true } }),
      prisma.appointment.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.contactInquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const uniqueEmails = await prisma.appointment.findMany({
      select: { patientEmail: true },
      distinct: ["patientEmail"],
    });

    return NextResponse.json({
      success: true,
      data: {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        totalDoctors,
        totalServices,
        totalBlogPosts,
        totalPatients: uniqueEmails.length,
        totalInquiries,
        newInquiries,
        totalTestimonials,
        totalNewsletters,
        recentAppointments,
        recentInquiries,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 },
    );
  }
}
