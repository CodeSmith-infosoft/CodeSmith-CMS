import { z } from "zod";

export const socialMediaFormSchema = z.object({
  url: z.string().min(1, "Link is requred"),
  image: z.union([
    z.instanceof(File),
    z.string().url('Image is required')
  ]),
});

export type socialMediaFormSchemaType = z.infer<typeof socialMediaFormSchema>;

export default socialMediaFormSchema;