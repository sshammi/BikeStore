import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email."),
  password: z.string({ required_error: "Password must be given" }),
});
