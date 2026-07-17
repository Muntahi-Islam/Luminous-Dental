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
    const group = searchParams.get("group") || undefined;

    const where: Record<string, any> = {};
    if (group) where.group = group;

    const settings = await prisma.siteSettings.findMany({
      where,
      orderBy: { key: "asc" },
    });

    const grouped: Record<string, Array<{ id: string; key: string; value: string; group: string; updatedAt: Date }>> = {};
    for (const setting of settings) {
      if (!grouped[setting.group]) grouped[setting.group] = [];
      grouped[setting.group].push(setting);
    }

    return NextResponse.json({ success: true, data: grouped });
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!Array.isArray(body.settings)) {
      return NextResponse.json(
        { success: false, error: "Request body must contain a settings array with {key, value} pairs" },
        { status: 400 },
      );
    }

    const updates: Array<{ key: string; value: string; group: string }> = [];
    for (const item of body.settings) {
      if (!item.key || typeof item.value !== "string") {
        return NextResponse.json(
          { success: false, error: `Invalid setting item: ${JSON.stringify(item)}` },
          { status: 400 },
        );
      }
      updates.push({ key: item.key, value: item.value, group: item.group || "general" });
    }

    const results = await Promise.all(
      updates.map((item) =>
        prisma.siteSettings.upsert({
          where: { key: item.key },
          update: { value: item.value, group: item.group },
          create: { key: item.key, value: item.value, group: item.group },
        }),
      ),
    );

    return NextResponse.json({
      success: true,
      data: results,
      message: `${results.length} settings updated successfully`,
    });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
