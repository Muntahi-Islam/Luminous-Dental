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
    const insurance = await prisma.insurance.findUnique({ where: { id } });

    if (!insurance) {
      return NextResponse.json({ success: false, error: "Insurance provider not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: insurance });
  } catch (error) {
    console.error("Failed to fetch insurance provider:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch insurance provider" }, { status: 500 });
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
    const existing = await prisma.insurance.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Insurance provider not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = ["name", "logo", "coverageNotes", "displayOrder"];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    const insurance = await prisma.insurance.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: insurance, message: "Insurance provider updated successfully" });
  } catch (error) {
    console.error("Failed to update insurance provider:", error);
    return NextResponse.json({ success: false, error: "Failed to update insurance provider" }, { status: 500 });
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
    const existing = await prisma.insurance.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Insurance provider not found" }, { status: 404 });
    }

    await prisma.insurance.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Insurance provider deleted successfully" });
  } catch (error) {
    console.error("Failed to delete insurance provider:", error);
    return NextResponse.json({ success: false, error: "Failed to delete insurance provider" }, { status: 500 });
  }
}
