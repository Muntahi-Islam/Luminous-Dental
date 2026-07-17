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
    const image = await prisma.galleryImage.findUnique({
      where: { id },
      include: { service: { select: { id: true, title: true, slug: true } } },
    });

    if (!image) {
      return NextResponse.json({ success: false, error: "Gallery image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error("Failed to fetch gallery image:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch gallery image" }, { status: 500 });
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
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Gallery image not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = [
      "title", "imageUrl", "beforeUrl", "afterUrl", "category",
      "description", "altText", "featured", "displayOrder", "serviceId",
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    const image = await prisma.galleryImage.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: image, message: "Gallery image updated successfully" });
  } catch (error) {
    console.error("Failed to update gallery image:", error);
    return NextResponse.json({ success: false, error: "Failed to update gallery image" }, { status: 500 });
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
    const existing = await prisma.galleryImage.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Gallery image not found" }, { status: 404 });
    }

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    console.error("Failed to delete gallery image:", error);
    return NextResponse.json({ success: false, error: "Failed to delete gallery image" }, { status: 500 });
  }
}
