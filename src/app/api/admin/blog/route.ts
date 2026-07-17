import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/validators";

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
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");
    const category = searchParams.get("category") || undefined;

    const where: Record<string, any> = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { author: { contains: search } },
        { tags: { contains: search } },
      ];
    }
    if (published === "true") where.published = true;
    if (published === "false") where.published = false;
    if (featured === "true") where.featured = true;
    if (featured === "false") where.featured = false;
    if (category) where.category = category;

    const [items, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          service: { select: { id: true, title: true, slug: true } },
          _count: { select: { comments: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "A blog post with this title already exists" }, { status: 409 });
    }

    if (data.serviceId) {
      const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
      if (!service) {
        return NextResponse.json({ success: false, error: "Selected service not found" }, { status: 400 });
      }
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        author: data.author,
        category: data.category,
        tags: data.tags,
        readingTime: data.readingTime ?? 5,
        featured: data.featured ?? false,
        published: data.published ?? false,
        publishedAt: data.published ? new Date() : null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        serviceId: data.serviceId || null,
      },
    });

    return NextResponse.json(
      { success: true, data: post, message: "Blog post created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json({ success: false, error: "Failed to create blog post" }, { status: 500 });
  }
}
