import { z } from "zod";

const techStackSchema = z.object({
  name: z.string().min(1, "Title is required"),
});

export type techStackFormData = z.infer<typeof techStackSchema>;

export default techStackSchema;
