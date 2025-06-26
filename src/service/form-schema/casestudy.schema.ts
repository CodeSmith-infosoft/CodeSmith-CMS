import { z } from "zod";

const solutionSchema = z.object({
  h: z.string().min(1, "Heading is required"),
  p: z.string().min(1, "Paragraph is required"),
});

const typographySchema = z.object({
  name: z.string().min(1, "Name is required"),
  cdn: z.string().min(1, "Paragraph is required").url("CDN URL must be valid"),
});

export const addCaseStudySchema = z.object({
  projectName: z.string().min(1, "Project Name is required"),
  description: z.string().min(1, "Description is required"),
  platform: z.string().min(1, "Platform is required"),
  duration: z.string().min(1, "Duration is required"),
  industry: z.string().min(1, "Industry is required"),

  // JSON stringified arrays
  tech: z.array(z.string().min(1, "Tech is required")),
  color: z.array(z.string().min(1, "Color is required")),
  devProcess: z.array(z.string().min(1, "Step is required")),
  problem: z.array(z.string().min(1, "Problem is required")),

  solution: z.array(solutionSchema).min(1, "At least one feature is required"),

  challenges: z.array(z.string().min(1, "Challenges is required")),

  typography: z.array(typographySchema).min(1, "At least one feature is required"),

  conclusion: z.array(z.string().min(1, "Conclusion is required")),

  // Files handled via multer
  companyLogo: z.union([
    z.instanceof(File),
    z.string().url("Company logo is required"),
  ]),
  mainImage: z.union([
    z.instanceof(File),
    z.string().url("Main image is required"),
  ]),
});

export type caseStudyFormSchemaType = z.infer<typeof addCaseStudySchema>;

export default addCaseStudySchema;
