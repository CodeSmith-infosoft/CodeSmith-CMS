import { z } from "zod";

const solutionSchema = z.object({
  h: z.string().min(1, "Heading cannot be empty"),
  p: z.string().min(1, "Paragraph cannot be empty"),
});

const typographySchema = z.object({
  name: z.string().min(1, "Name is required"),
  cdn: z.string().min(1, "Paragraph is required").url("CDN URL must be valid"),
});

export const addCaseStudySchema = z.object({
  projectName: z.string().min(1, "Project Name is required"),
  description: z.string().min(1, "Description is required").max(820, "Paragraph must contain less then 820 letters."),
  platform: z.string().min(1, "Platform is required"),
  duration: z.string().min(1, "Duration is required"),
  industry: z.string().min(1, "Industry is required"),

  // JSON stringified arrays
  tech: z
    .array(z.string().min(1, "Tech cannot be empty"))
    .min(1, "At least one tech is required"),
  devProcess: z
    .array(z.string().min(1, "Step cannot be empty"))
    .min(1, "At least one dev process is required"),
  problem: z
    .array(z.string().min(1, "Problem cannot be empty"))
    .min(1, "At least one problem is required"),
  challenges: z
    .array(z.string().min(1, "Challenges cannot be empty"))
    .min(1, "At least one challenge is required"),
  conclusion: z
    .array(z.string().min(1, "Conclusion cannot be empty"))
    .min(1, "At least one conclusion is required"),

  solution: z.array(solutionSchema).min(1, "At least one solution is required"),

  // Files handled via multer
  companyLogo: z.union([
    z.instanceof(File),
    z.string().url("Company logo is required"),
  ]),
  mainImage: z.union([
    z.instanceof(File),
    z.string().url("Main image is required"),
  ]),
  color: z.union([
    z.instanceof(File),
    z.string().url("Color logo is required"),
  ]),
  typography: z.union([
    z.instanceof(File),
    z.string().url("Typography image is required"),
  ]),
});

export type caseStudyFormSchemaType = z.infer<typeof addCaseStudySchema>;

export default addCaseStudySchema;
