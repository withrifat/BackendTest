import { z } from "zod";

// ১. অথর তৈরির স্কিমা
export const createAuthorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  bio: z.string().optional(),
});

// ২. অথর আপডেট (Patch/Put) করার স্কিমা (সব ফিল্ড অপশনাল থাকবে)
export const updateAuthorSchema = z.object({
  
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email format").optional(),
  bio: z.string().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field is required to update author",
});

// ৩. আইডি (Params) চেক করার স্কিমা
export const authorIdSchema = z.object({
  id: z.string({
    required_error: "Author ID is required",
  }),
});
