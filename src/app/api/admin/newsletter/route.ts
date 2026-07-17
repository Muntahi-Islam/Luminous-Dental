import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const active = searchParams.get("active");

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
      ];
    }
    if (active === "true") where.active = true;
    if (active === "false") where.active = false;

    const [items, total] = await Promise.all([
      prisma.newsletter.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.newsletter.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch newsletter subscribers:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch newsletter subscribers" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Subscriber ID is required" }, { status: 400 });
    }

    const existing = await prisma.newsletter.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Subscriber not found" }, { status: 404 });
    }

    const subscriber = await prisma.newsletter.update({
      where: { id },
      data: { active: typeof active === "boolean" ? active : existing.active },
    });

    return NextResponse.json({ success: true, data: subscriber, message: "Subscriber updated successfully" });
  } catch (error) {
    console.error("Failed to update subscriber:", error);
    return NextResponse.json({ success: false, error: "Failed to update subscriber" }, { status: 500 });
  }
}
