import { z } from "zod";

export function createPaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10)));
  const search = searchParams.get("search") || undefined;
  return { page, pageSize, search };
}

export function buildPaginatedResponse<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildSearchWhere(search: string | undefined, fields: string[]) {
  if (!search) return undefined;
  return {
    OR: fields.map((field) => ({ [field]: { contains: search } })),
  };
}

export const appointmentStatusEnum = z.enum([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "no_show",
]);

export const contactStatusEnum = z.enum([
  "new",
  "in_progress",
  "replied",
  "archived",
]);

export const userRoleEnum = z.enum([
  "super_admin",
  "dentist",
  "receptionist",
  "marketing_manager",
  "content_editor",
]);

export function validateRequired(body: Record<string, any>, fields: string[]): string | null {
  for (const field of fields) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

export function extractAllowedFields(
  body: Record<string, any>,
  allowedFields: string[],
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const field of allowedFields) {
    if (field in body) {
      result[field] = body[field];
    }
  }
  return result;
}
