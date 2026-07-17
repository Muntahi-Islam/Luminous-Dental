import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { doctorSchema } from "@/validators";

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
        { name: { contains: search } },
        { title: { contains: search } },
        { specializations: { contains: search } },
      ];
    }
    if (featured === "true") where.featured = true;
    if (featured === "false") where.featured = false;

    const [items, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        orderBy: { displayOrder: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.doctor.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = doctorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const existing = await prisma.doctor.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "A doctor with this name already exists" }, { status: 409 });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        slug,
        title: data.title,
        bio: data.bio,
        portrait: data.portrait,
        specializations: data.specializations,
        qualifications: data.qualifications,
        experience: data.experience,
        languages: data.languages,
        memberships: data.memberships || null,
        email: data.email || null,
        phone: data.phone || null,
        displayOrder: data.displayOrder ?? 0,
        featured: data.featured ?? false,
        workingHours: data.workingHours || null,
      },
    });

    return NextResponse.json(
      { success: true, data: doctor, message: "Doctor created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return NextResponse.json({ success: false, error: "Failed to create doctor" }, { status: 500 });
  }
}
