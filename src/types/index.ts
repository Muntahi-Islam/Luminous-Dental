import type { Session as NextAuthSession, User as NextAuthUser } from "next-auth";

// ─── Role Types ───────────────────────────────────────────────
export type UserRole = "super_admin" | "dentist" | "receptionist" | "marketing_manager" | "content_editor";

// ─── Model Types (mirrors Prisma schema) ──────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string | null;
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionRecord {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  title: string;
  bio: string;
  portrait: string;
  specializations: string;
  qualifications: string;
  experience: string;
  languages: string;
  memberships: string | null;
  email: string | null;
  phone: string | null;
  displayOrder: number;
  featured: boolean;
  workingHours: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  icon: string | null;
  benefits: string;
  procedure: string;
  recovery: string;
  pricing: string | null;
  featured: boolean;
  displayOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  doctorId: string | null;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  notes: string | null;
  insurance: string | null;
  status: AppointmentStatus;
  dentistId: string | null;
  serviceId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show";

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  assignedTo: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ContactStatus = "new" | "in_progress" | "replied" | "archived";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string;
  readingTime: number;
  featured: boolean;
  published: boolean;
  publishedAt: Date | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
  serviceId: string | null;
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  title: string;
  imageUrl: string;
  beforeUrl: string | null;
  afterUrl: string | null;
  category: string;
  description: string | null;
  altText: string;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
  serviceId: string | null;
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientInitials: string;
  rating: number;
  content: string;
  videoUrl: string | null;
  treatmentType: string;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  createdAt: Date;
  serviceId: string | null;
}

export interface Insurance {
  id: string;
  name: string;
  logo: string | null;
  coverageNotes: string | null;
  displayOrder: number;
  createdAt: Date;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  group: string;
  updatedAt: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  name: string | null;
  active: boolean;
  createdAt: Date;
}

// ─── Extended Auth Types ──────────────────────────────────────
export interface ExtendedUser extends NextAuthUser {
  id: string;
  role: UserRole;
}

export interface ExtendedSession {
  user: ExtendedUser;
  expires: string;
}

// ─── API Response Types ───────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Dashboard Stats ──────────────────────────────────────────
export interface DashboardStats {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalDoctors: number;
  totalServices: number;
  totalBlogPosts: number;
  totalPatients: number;
  totalInquiries: number;
  newInquiries: number;
  totalTestimonials: number;
  totalNewsletters: number;
  recentAppointments: Appointment[];
  recentInquiries: ContactInquiry[];
}

// ─── Query / Filter Types ─────────────────────────────────────
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface AppointmentFilters extends PaginationParams {
  status?: AppointmentStatus;
  dentistId?: string;
  serviceId?: string;
  search?: string;
}

// ─── Form Data Types ──────────────────────────────────────────
export interface AppointmentFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  notes?: string;
  insurance?: string;
  dentistId?: string;
  serviceId?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
}

export interface ServiceFormData {
  title: string;
  slug?: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  icon?: string;
  benefits: string;
  procedure: string;
  recovery: string;
  pricing?: string;
  featured?: boolean;
  displayOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
  doctorId?: string;
}

export interface DoctorFormData {
  name: string;
  slug?: string;
  title: string;
  bio: string;
  portrait: string;
  specializations: string;
  qualifications: string;
  experience: string;
  languages: string;
  memberships?: string;
  email?: string;
  phone?: string;
  displayOrder?: number;
  featured?: boolean;
  workingHours?: string;
}

export interface BlogPostFormData {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string;
  readingTime?: number;
  featured?: boolean;
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  serviceId?: string;
}

export interface CommentFormData {
  postId: string;
  name: string;
  email: string;
  content: string;
}

export interface GalleryImageFormData {
  title: string;
  imageUrl: string;
  beforeUrl?: string;
  afterUrl?: string;
  category: string;
  description?: string;
  altText: string;
  featured?: boolean;
  displayOrder?: number;
  serviceId?: string;
}

export interface TestimonialFormData {
  patientName: string;
  patientInitials?: string;
  rating: number;
  content: string;
  videoUrl?: string;
  treatmentType: string;
  featured?: boolean;
  displayOrder?: number;
}

export interface FAQFormData {
  question: string;
  answer: string;
  category: string;
  displayOrder?: number;
  serviceId?: string;
}

export interface InsuranceFormData {
  name: string;
  logo?: string;
  coverageNotes?: string;
  displayOrder?: number;
}

export interface SiteSettingsFormData {
  key: string;
  value: string;
  group: string;
}
