import { z } from "zod";

const SingleTestimonialSchema = z.object({
  // General Information section
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  rating: z.string().min(1, "Rating is required"),

  // Media section
  image: z.union([z.instanceof(File), z.string().url("Image is required")]),
});

export type SingleTestimonialFormData = z.infer<typeof SingleTestimonialSchema>;

export default SingleTestimonialSchema;
