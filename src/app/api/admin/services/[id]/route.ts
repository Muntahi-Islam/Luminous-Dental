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
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        doctor: { select: { id: true, name: true, slug: true, title: true } },
        _count: { select: { appointments: true, galleryImages: true, faqs: true, blogPosts: true } },
      },
    });

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch service" }, { status: 500 });
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
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = [
      "title", "slug", "shortDescription", "description", "heroImage", "icon",
      "benefits", "procedure", "recovery", "pricing", "featured", "displayOrder",
      "seoTitle", "seoDescription", "doctorId",
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    if (updateData.slug && updateData.slug !== existing.slug) {
      const slugExists = await prisma.service.findUnique({ where: { slug: updateData.slug } });
      if (slugExists) {
        return NextResponse.json({ success: false, error: "A service with this slug already exists" }, { status: 409 });
      }
    }

    if (updateData.doctorId) {
      const doctor = await prisma.doctor.findUnique({ where: { id: updateData.doctorId } });
      if (!doctor) {
        return NextResponse.json({ success: false, error: "Selected doctor not found" }, { status: 400 });
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: service, message: "Service updated successfully" });
  } catch (error) {
    console.error("Failed to update service:", error);
    return NextResponse.json({ success: false, error: "Failed to update service" }, { status: 500 });
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
    const existing = await prisma.service.findUnique({
      where: { id },
      include: { _count: { select: { appointments: true, blogPosts: true, galleryImages: true } } },
    });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    if (existing._count.appointments > 0 || existing._count.blogPosts > 0 || existing._count.galleryImages > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete service with existing associations. Remove associations first." },
        { status: 400 },
      );
    }

    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json({ success: false, error: "Failed to delete service" }, { status: 500 });
  }
}
