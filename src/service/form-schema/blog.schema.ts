import { z } from "zod";

const SingleBlogSchema = z.object({
  // Category section
  techStackId: z.string().min(1, "Tech Stack is required"),

  // General Information section
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Product description is required"),
  details: z.string().min(1, "Details are required"),
  createdBy: z.string().min(1, "Details are required"),

  // Media section
  image: z.union([z.instanceof(File), z.string().url("Image is required")]),
});

export type SingleBlogFormData = z.infer<typeof SingleBlogSchema>;

export default SingleBlogSchema;
