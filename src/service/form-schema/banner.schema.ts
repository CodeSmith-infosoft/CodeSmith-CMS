import { z } from "zod";

export const bannerFormSchema = z.object({
  image: z.union([
    z.instanceof(File),
    z.string().url('Image is required')
  ]),
});

export type bannerFormSchemaType = z.infer<typeof bannerFormSchema>;

export default bannerFormSchema;