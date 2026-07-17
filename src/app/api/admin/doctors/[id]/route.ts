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
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        services: { select: { id: true, title: true, slug: true } },
        _count: { select: { appointments: true } },
      },
    });

    if (!doctor) {
      return NextResponse.json({ success: false, error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: doctor });
  } catch (error) {
    console.error("Failed to fetch doctor:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch doctor" }, { status: 500 });
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
    const existing = await prisma.doctor.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Doctor not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = [
      "name", "slug", "title", "bio", "portrait", "specializations",
      "qualifications", "experience", "languages", "memberships",
      "email", "phone", "displayOrder", "featured", "workingHours",
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    if (updateData.slug && updateData.slug !== existing.slug) {
      const slugExists = await prisma.doctor.findUnique({ where: { slug: updateData.slug } });
      if (slugExists) {
        return NextResponse.json({ success: false, error: "A doctor with this slug already exists" }, { status: 409 });
      }
    }

    const doctor = await prisma.doctor.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: doctor, message: "Doctor updated successfully" });
  } catch (error) {
    console.error("Failed to update doctor:", error);
    return NextResponse.json({ success: false, error: "Failed to update doctor" }, { status: 500 });
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
    const existing = await prisma.doctor.findUnique({
      where: { id },
      include: { _count: { select: { appointments: true, services: true } } },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Doctor not found" }, { status: 404 });
    }

    if (existing._count.appointments > 0 || existing._count.services > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete doctor with existing appointments or services. Remove associations first." },
        { status: 400 },
      );
    }

    await prisma.doctor.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return NextResponse.json({ success: false, error: "Failed to delete doctor" }, { status: 500 });
  }
}
