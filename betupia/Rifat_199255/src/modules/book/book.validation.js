import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;


export const createBookValidationSchema = z.object({
  title: z.string({
    required_error: "Book title is required",
  }).min(1, { message: "Title cannot be empty" }),

  isbn: z.string({
    required_error: "ISBN is required",
  }).min(1, { message: "ISBN cannot be empty" }),

  description: z.string().optional(),

  publishedYear: z.number({
    invalid_type_error: "Published year must be a number",
  }).optional(),

  authorId: z.string({
    required_error: "Author ID is required",
  }).regex(objectIdRegex, { message: "Invalid author ID format (must be a valid MongoDB ObjectId)" }),
});

export const updateBookValidationSchema = z.object({
    title:z.string().min(1).optional(),
    
})