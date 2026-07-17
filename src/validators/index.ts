import { z } from "zod";

// ─── Appointment ──────────────────────────────────────────────
export const appointmentSchema = z.object({
  patientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  patientEmail: z.string().email("Please enter a valid email address"),
  patientPhone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number must be at most 20 digits")
    .regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  reason: z
    .string()
    .min(3, "Please describe your reason for visit")
    .max(500, "Reason must be at most 500 characters"),
  notes: z.string().max(1000, "Notes must be at most 1000 characters").optional(),
  insurance: z.string().max(100, "Insurance name must be at most 100 characters").optional(),
  dentistId: z.string().optional(),
  serviceId: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// ─── Contact ──────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .max(20, "Phone number must be at most 20 digits")
    .regex(/^[\d\s\-+()]*$/, "Please enter a valid phone number")
    .optional(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be at most 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be at most 5000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Newsletter ───────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().max(100, "Name must be at most 100 characters").optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

// ─── Service ──────────────────────────────────────────────────
export const serviceSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be at most 200 characters"),
  slug: z.string().max(200, "Slug must be at most 200 characters").optional(),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(300, "Short description must be at most 300 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  heroImage: z.string().url("Please enter a valid URL").min(1, "Hero image is required"),
  icon: z.string().max(100, "Icon must be at most 100 characters").optional(),
  benefits: z.string().min(10, "Benefits must be at least 10 characters"),
  procedure: z.string().min(10, "Procedure must be at least 10 characters"),
  recovery: z.string().min(10, "Recovery info must be at least 10 characters"),
  pricing: z.string().max(200, "Pricing must be at most 200 characters").optional(),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
  seoTitle: z.string().max(200, "SEO title must be at most 200 characters").optional(),
  seoDescription: z.string().max(300, "SEO description must be at most 300 characters").optional(),
  doctorId: z.string().optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// ─── Doctor ───────────────────────────────────────────────────
export const doctorSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  slug: z.string().max(100, "Slug must be at most 100 characters").optional(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be at most 200 characters"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  portrait: z.string().url("Please enter a valid URL").min(1, "Portrait image is required"),
  specializations: z.string().min(3, "Specializations are required"),
  qualifications: z.string().min(3, "Qualifications are required"),
  experience: z.string().min(3, "Experience is required"),
  languages: z.string().min(2, "Languages are required"),
  memberships: z.string().max(500, "Memberships must be at most 500 characters").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  phone: z.string().max(20, "Phone must be at most 20 characters").optional(),
  displayOrder: z.number().int().min(0).optional(),
  featured: z.boolean().optional(),
  workingHours: z.string().max(500, "Working hours must be at most 500 characters").optional(),
});

export type DoctorInput = z.infer<typeof doctorSchema>;

// ─── Blog Post ────────────────────────────────────────────────
export const blogPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters"),
  slug: z.string().max(200, "Slug must be at most 200 characters").optional(),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500, "Excerpt must be at most 500 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  featuredImage: z.string().url("Please enter a valid URL").min(1, "Featured image is required"),
  author: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name must be at most 100 characters"),
  category: z.string().min(2, "Category is required"),
  tags: z.string().min(1, "At least one tag is required"),
  readingTime: z.number().int().min(1).max(120).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  seoTitle: z.string().max(200, "SEO title must be at most 200 characters").optional(),
  seoDescription: z.string().max(300, "SEO description must be at most 300 characters").optional(),
  serviceId: z.string().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// ─── Comment ──────────────────────────────────────────────────
export const commentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  content: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(2000, "Comment must be at most 2000 characters"),
});

export type CommentInput = z.infer<typeof commentSchema>;

// ─── Gallery Image ────────────────────────────────────────────
export const galleryImageSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be at most 200 characters"),
  imageUrl: z.string().url("Please enter a valid URL").min(1, "Image URL is required"),
  beforeUrl: z.string().url("Please enter a valid URL").optional(),
  afterUrl: z.string().url("Please enter a valid URL").optional(),
  category: z.string().min(2, "Category is required"),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
  altText: z.string().min(2, "Alt text is required").max(200, "Alt text must be at most 200 characters"),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
  serviceId: z.string().optional(),
});

export type GalleryImageInput = z.infer<typeof galleryImageSchema>;

// ─── Testimonial ──────────────────────────────────────────────
export const testimonialSchema = z.object({
  patientName: z
    .string()
    .min(2, "Patient name must be at least 2 characters")
    .max(100, "Patient name must be at most 100 characters"),
  patientInitials: z
    .string()
    .max(4, "Initials must be at most 4 characters")
    .optional(),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(2000, "Content must be at most 2000 characters"),
  videoUrl: z.string().url("Please enter a valid URL").optional(),
  treatmentType: z.string().min(2, "Treatment type is required"),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// ─── FAQ ──────────────────────────────────────────────────────
export const faqSchema = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters")
    .max(300, "Question must be at most 300 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  displayOrder: z.number().int().min(0).optional(),
  serviceId: z.string().optional(),
});

export type FAQInput = z.infer<typeof faqSchema>;

// ─── Insurance ────────────────────────────────────────────────
export const insuranceSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must be at most 200 characters"),
  logo: z.string().url("Please enter a valid URL").optional(),
  coverageNotes: z.string().max(500, "Notes must be at most 500 characters").optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export type InsuranceInput = z.infer<typeof insuranceSchema>;

// ─── Site Settings ────────────────────────────────────────────
export const siteSettingsSchema = z.object({
  key: z.string().min(1, "Key is required").max(100, "Key must be at most 100 characters"),
  value: z.string(),
  group: z.string().min(1, "Group is required").max(100, "Group must be at most 100 characters"),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;

// ─── Auth (Login) ─────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
