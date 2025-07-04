import { z } from "zod";

const SingleTeamSchema = z.object({
  // General Information section
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  // Media section
  photo: z.union([z.instanceof(File), z.string().url("Image is required")]),
});

export type SingleTeamFormData = z.infer<typeof SingleTeamSchema>;

export default SingleTeamSchema;
