import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10)));
    const status = searchParams.get("status") || undefined;
    const dentistId = searchParams.get("dentistId") || undefined;
    const serviceId = searchParams.get("serviceId") || undefined;
    const search = searchParams.get("search") || undefined;

    const where: Record<string, any> = {};

    if (status) {
      where.status = status;
    }
    if (dentistId) {
      where.dentistId = dentistId;
    }
    if (serviceId) {
      where.serviceId = serviceId;
    }
    if (search) {
      where.OR = [
        { patientName: { contains: search } },
        { patientEmail: { contains: search } },
        { reason: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          doctor: { select: { id: true, name: true, slug: true } },
          service: { select: { id: true, title: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.appointment.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = appointmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues.map((i) => i.message).join(", "),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.dentistId) {
      const doctor = await prisma.doctor.findUnique({ where: { id: data.dentistId } });
      if (!doctor) {
        return NextResponse.json(
          { success: false, error: "Selected doctor not found" },
          { status: 400 },
        );
      }
    }

    if (data.serviceId) {
      const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
      if (!service) {
        return NextResponse.json(
          { success: false, error: "Selected service not found" },
          { status: 400 },
        );
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        reason: data.reason,
        notes: data.notes || null,
        insurance: data.insurance || null,
        dentistId: data.dentistId || null,
        serviceId: data.serviceId || null,
      },
    });

    return NextResponse.json(
      { success: true, data: appointment, message: "Appointment created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create appointment" },
      { status: 500 },
    );
  }
}
