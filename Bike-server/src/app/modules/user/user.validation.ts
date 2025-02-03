import { z } from "zod";

export const userCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }),
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(4, { message: 'Password must be at least 6 characters long.' }),
    role: z.enum(['admin', 'customer']).default('customer'),
    deactive: z.boolean().default(false), 
  }),
});

