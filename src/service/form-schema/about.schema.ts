import { z } from "zod";

export const aboutFormSchema = z.object({
  type: z.string().min(1, "Type is required"),
  mediaFile: z.union([
    z.instanceof(File),
    z.string().url('Image is required')
  ]),
});

export type aboutFormSchemaType = z.infer<typeof aboutFormSchema>;

export default aboutFormSchema;