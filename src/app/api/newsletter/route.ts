import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues.map((i) => i.message).join(", "),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const existing = await prisma.newsletter.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (!existing.active) {
        const updated = await prisma.newsletter.update({
          where: { email: data.email },
          data: { active: true, name: data.name || existing.name },
        });
        return NextResponse.json(
          { success: true, data: updated, message: "Successfully resubscribed!" },
        );
      }
      return NextResponse.json(
        { success: false, error: "You are already subscribed to our newsletter" },
        { status: 409 },
      );
    }

    const subscriber = await prisma.newsletter.create({
      data: {
        email: data.email,
        name: data.name || null,
      },
    });

    return NextResponse.json(
      { success: true, data: subscriber, message: "Successfully subscribed to our newsletter!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe. Please try again later." },
      { status: 500 },
    );
  }
}
