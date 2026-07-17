import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { galleryImageSchema } from "@/validators";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10)));
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured");

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { altText: { contains: search } },
      ];
    }
    if (category) where.category = category;
    if (featured === "true") where.featured = true;
    if (featured === "false") where.featured = false;

    const [items, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        include: {
          service: { select: { id: true, title: true, slug: true } },
        },
        orderBy: { displayOrder: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.galleryImage.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch gallery images" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = galleryImageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.serviceId) {
      const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
      if (!service) {
        return NextResponse.json({ success: false, error: "Selected service not found" }, { status: 400 });
      }
    }

    const image = await prisma.galleryImage.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
        beforeUrl: data.beforeUrl || null,
        afterUrl: data.afterUrl || null,
        category: data.category,
        description: data.description || null,
        altText: data.altText,
        featured: data.featured ?? false,
        displayOrder: data.displayOrder ?? 0,
        serviceId: data.serviceId || null,
      },
    });

    return NextResponse.json(
      { success: true, data: image, message: "Gallery image created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create gallery image:", error);
    return NextResponse.json({ success: false, error: "Failed to create gallery image" }, { status: 500 });
  }
}
