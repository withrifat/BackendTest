import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive(),
  department: z.string().min(2),
});

export const updateStudentSchema = createStudentSchema.partial();