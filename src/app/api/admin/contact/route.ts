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
    const status = searchParams.get("status") || undefined;

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { subject: { contains: search } },
        { message: { contains: search } },
      ];
    }
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      prisma.contactInquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.contactInquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch contact inquiries:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contact inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status, notes, assignedTo } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Inquiry ID is required" }, { status: 400 });
    }

    const existing = await prisma.contactInquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Contact inquiry not found" }, { status: 404 });
    }

    const allowedStatuses = ["new", "in_progress", "replied", "archived"];
    if (status && !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Allowed: ${allowedStatuses.join(", ")}` },
        { status: 400 },
      );
    }

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: inquiry, message: "Contact inquiry updated successfully" });
  } catch (error) {
    console.error("Failed to update contact inquiry:", error);
    return NextResponse.json({ success: false, error: "Failed to update contact inquiry" }, { status: 500 });
  }
}
