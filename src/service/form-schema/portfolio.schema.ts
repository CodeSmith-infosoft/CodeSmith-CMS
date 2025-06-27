import { z } from "zod";

export const addPortfolioSchema = z.object({
  projectName: z.string().min(1, "Project Name is required"),
  description: z.string().min(1, "Description is required"),
  techStackId: z.string().min(1, "Tech Stack is required"),

  // JSON stringified arrays
  features: z
    .array(z.string().min(1, "Features be empty"))
    .min(1, "At least one feature is required"),

  // Files handled via multer
  image: z.union([z.instanceof(File), z.string().url("Image is required")]),
  banner: z.union([z.instanceof(File), z.string().url("Banner is required")]),
});

export type portfolioFormSchemaType = z.infer<typeof addPortfolioSchema>;

export default addPortfolioSchema;
