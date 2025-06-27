import { z } from "zod";

const JobPostingSchema = z.object({
  techStackId: z.string().min(1, "Tech Stack is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  qualification: z.string().min(1, "Qualification is required"),
  location: z.string().min(1, "Location is required"),
  experience: z.string().min(1, "Experience is required"),
  vacancy: z.number().min(1, "At least one vacancy is required"),
  ofcTime: z.string().min(1, "Office time is required"),
  role: z
    .array(z.string().min(1, "Role description cannot be empty"))
    .min(1, "At least one role is required"),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required"),
  benefits: z
    .array(z.string().min(1, "Benefit cannot be empty"))
    .min(1, "At least one benefit is required"),
});

export type JobPostingFormData = z.infer<typeof JobPostingSchema>;

export default JobPostingSchema;
