import { z } from 'zod';

export const PackageCategoryEnum = z.enum([
  'Hill',
  'Beach',
  'Adventure',
  'Heritage',
  'City'
]);

export const ItineraryDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1, "Title is required"),
  details: z.string().min(1, "Details are required"),
});

export const PackageSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  shortDescription: z.string().max(150, "Short description must be at most 150 characters"),
  fullDescription: z.string().min(10, "Full description must be at least 10 characters long"),
  images: z.array(z.string().url()),
  price: z.number().positive("Price must be positive"),
  durationDays: z.number().int().positive("Duration must be a positive integer"),
  category: PackageCategoryEnum,
  location: z.string().min(1, "Location is required"),
  rating: z.number().min(0).max(5).default(0),
  itinerary: z.array(ItineraryDaySchema).min(1, "At least one itinerary day is required"),
  ownerId: z.string(),
  createdAt: z.string().datetime().optional(),
});

export const ReviewSchema = z.object({
  _id: z.string().optional(),
  packageId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters long"),
  createdAt: z.string().datetime().optional(),
});

export const ChatMessageSchema = z.object({
  _id: z.string().optional(),
  sessionId: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1),
  createdAt: z.string().datetime().optional(),
});

export type Package = z.infer<typeof PackageSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
