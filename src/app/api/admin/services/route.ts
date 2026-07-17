import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/validators";

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
    const featured = searchParams.get("featured");

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDescription: { contains: search } },
        { description: { contains: search } },
      ];
    }
    if (featured === "true") where.featured = true;
    if (featured === "false") where.featured = false;

    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          doctor: { select: { id: true, name: true, slug: true } },
          _count: { select: { appointments: true, galleryImages: true, faqs: true, blogPosts: true } },
        },
        orderBy: { displayOrder: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "A service with this title already exists" }, { status: 409 });
    }

    if (data.doctorId) {
      const doctor = await prisma.doctor.findUnique({ where: { id: data.doctorId } });
      if (!doctor) {
        return NextResponse.json({ success: false, error: "Selected doctor not found" }, { status: 400 });
      }
    }

    const service = await prisma.service.create({
      data: {
        title: data.title,
        slug,
        shortDescription: data.shortDescription,
        description: data.description,
        heroImage: data.heroImage,
        icon: data.icon || null,
        benefits: data.benefits,
        procedure: data.procedure,
        recovery: data.recovery,
        pricing: data.pricing || null,
        featured: data.featured ?? false,
        displayOrder: data.displayOrder ?? 0,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        doctorId: data.doctorId || null,
      },
    });

    return NextResponse.json(
      { success: true, data: service, message: "Service created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
