import { z } from "zod";

export const subCategoryFormSchema = z.object({
  name: z.string().min(1, "Category is requred"),
//   image: z.union([z.instanceof(File), z.string().url("Image is required")]),
});

export type subCategoryFormSchemaType = z.infer<typeof subCategoryFormSchema>;

export default subCategoryFormSchema;
