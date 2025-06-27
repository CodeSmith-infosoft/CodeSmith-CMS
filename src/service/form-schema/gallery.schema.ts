import { z } from "zod";

export const bannerFormSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

export type bannerFormSchemaType = z.infer<typeof bannerFormSchema>;

export default bannerFormSchema;
