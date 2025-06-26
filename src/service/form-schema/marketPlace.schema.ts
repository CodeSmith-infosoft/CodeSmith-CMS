import { z } from "zod";

export const marketPlaceFormSchema = z.object({
  link: z.string().min(1, "Link is requred"),
  image: z.union([
    z.instanceof(File),
    z.string().url('Image is required')
  ]),
});

export type marketPlaceFormSchemaType = z.infer<typeof marketPlaceFormSchema>;

export default marketPlaceFormSchema;