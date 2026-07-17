import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { testimonialSchema } from "@/validators";

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
    const rating = searchParams.get("rating");

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { patientName: { contains: search } },
        { content: { contains: search } },
        { treatmentType: { contains: search } },
      ];
    }
    if (featured === "true") where.featured = true;
    if (featured === "false") where.featured = false;
    if (rating) where.rating = parseInt(rating, 10);

    const [items, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: { displayOrder: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.testimonial.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const initials = data.patientInitials || data.patientName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

    const testimonial = await prisma.testimonial.create({
      data: {
        patientName: data.patientName,
        patientInitials: initials,
        rating: data.rating,
        content: data.content,
        videoUrl: data.videoUrl || null,
        treatmentType: data.treatmentType,
        featured: data.featured ?? false,
        displayOrder: data.displayOrder ?? 0,
      },
    });

    return NextResponse.json(
      { success: true, data: testimonial, message: "Testimonial created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return NextResponse.json({ success: false, error: "Failed to create testimonial" }, { status: 500 });
  }
}
