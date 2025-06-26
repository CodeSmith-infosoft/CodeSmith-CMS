import { z } from "zod";

const techStackSchema = z.object({
  name: z.string().min(1, "Title is required"),
  bgColor: z.string().min(1, "Product description is required"),
  textColor: z.string().min(1, "Details are required"),
});

export type techStackFormData = z.infer<typeof techStackSchema>;

export default techStackSchema;
