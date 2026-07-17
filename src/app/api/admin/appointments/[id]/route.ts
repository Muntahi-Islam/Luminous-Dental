import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        doctor: { select: { id: true, name: true, slug: true, title: true, email: true } },
        service: { select: { id: true, title: true, slug: true } },
      },
    });

    if (!appointment) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    console.error("Failed to fetch appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch appointment" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = [
      "patientName", "patientEmail", "patientPhone", "preferredDate",
      "preferredTime", "reason", "notes", "insurance", "status",
      "dentistId", "serviceId",
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    if (updateData.dentistId) {
      const doctor = await prisma.doctor.findUnique({ where: { id: updateData.dentistId } });
      if (!doctor) {
        return NextResponse.json({ success: false, error: "Selected doctor not found" }, { status: 400 });
      }
    }

    if (updateData.serviceId) {
      const service = await prisma.service.findUnique({ where: { id: updateData.serviceId } });
      if (!service) {
        return NextResponse.json({ success: false, error: "Selected service not found" }, { status: 400 });
      }
    }

    const appointment = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        doctor: { select: { id: true, name: true, slug: true } },
        service: { select: { id: true, title: true, slug: true } },
      },
    });

    return NextResponse.json({ success: true, data: appointment, message: "Appointment updated successfully" });
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.appointment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });
    }

    await prisma.appointment.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return NextResponse.json({ success: false, error: "Failed to delete appointment" }, { status: 500 });
  }
}
