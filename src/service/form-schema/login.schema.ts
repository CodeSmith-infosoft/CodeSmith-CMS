import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is requred")
    .email("Please enter valid email"),
  password: z.string().min(1, "Password is requred"),
});

export type loginFormDataType = z.infer<typeof loginFormSchema>;

export default loginFormSchema;
