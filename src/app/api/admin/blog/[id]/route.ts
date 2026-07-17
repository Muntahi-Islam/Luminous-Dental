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
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        service: { select: { id: true, title: true, slug: true } },
        comments: { orderBy: { createdAt: "desc" } },
        _count: { select: { comments: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog post" }, { status: 500 });
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
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    const body = await request.json();
    const allowedFields = [
      "title", "slug", "excerpt", "content", "featuredImage", "author",
      "category", "tags", "readingTime", "featured", "published",
      "seoTitle", "seoDescription", "serviceId",
    ];

    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) updateData[field] = body[field];
    }

    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    if (updateData.slug && updateData.slug !== existing.slug) {
      const slugExists = await prisma.blogPost.findUnique({ where: { slug: updateData.slug } });
      if (slugExists) {
        return NextResponse.json({ success: false, error: "A blog post with this slug already exists" }, { status: 409 });
      }
    }

    if (updateData.published && !existing.published) {
      updateData.publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: post, message: "Blog post updated successfully" });
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog post" }, { status: 500 });
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
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Blog post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog post" }, { status: 500 });
  }
}
