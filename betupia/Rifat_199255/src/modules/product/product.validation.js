import { z } from "zod";

const productFields = {
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(2000),
  price: z.number().finite().nonnegative(),
  category: z.string().trim().min(1).max(100),
  brand: z.string().trim().min(1).max(100),
  stock: z.number().int().nonnegative(),
  sku: z.string().trim().min(1).max(100),
};

export const createProductSchema = z.object(productFields).strict();
export const replaceProductSchema = createProductSchema;
export const updateProductSchema = z.object(productFields).partial().strict()
  .refine((value) => Object.keys(value).length > 0, "At least one field is required");

export const productIdSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId");
