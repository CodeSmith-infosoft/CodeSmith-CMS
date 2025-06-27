import { z } from "zod";

export const successSchema = z.object({
  image: z.union([
    z.instanceof(File),
    z.string().url('Image is required')
  ]),
  type: z.string().min(1, "Type is requred"),
});

export type successFormSchemaType = z.infer<typeof successSchema>;

export default successSchema;