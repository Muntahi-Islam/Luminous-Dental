import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { insuranceSchema } from "@/validators";

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

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { coverageNotes: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.insurance.findMany({
        where,
        orderBy: { displayOrder: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.insurance.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch insurance providers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch insurance providers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = insuranceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const insurance = await prisma.insurance.create({
      data: {
        name: data.name,
        logo: data.logo || null,
        coverageNotes: data.coverageNotes || null,
        displayOrder: data.displayOrder ?? 0,
      },
    });

    return NextResponse.json(
      { success: true, data: insurance, message: "Insurance provider created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create insurance provider:", error);
    return NextResponse.json({ success: false, error: "Failed to create insurance provider" }, { status: 500 });
  }
}
