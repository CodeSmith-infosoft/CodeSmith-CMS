import { z } from "zod";

export const bannerFormSchema = z.object({
  images: z.union([
    z.instanceof(File),
    z.string().url('Images is required')
  ]),
});

export type bannerFormSchemaType = z.infer<typeof bannerFormSchema>;

export default bannerFormSchema;