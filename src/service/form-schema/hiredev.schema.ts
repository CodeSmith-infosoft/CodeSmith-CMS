import { z } from "zod";

export const addHireDevSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required"),
  logo: z.union([z.instanceof(File), z.string().url("Logo is required")]),
});

export type hireDevFormSchemaType = z.infer<typeof addHireDevSchema>;

export default addHireDevSchema;
