import { z } from "zod";

const OrderCreateValidationSchema = z.object({
  body: z.object({
    productName: z.string({ required_error: "Product name is required." }),
    productModel: z.string({ required_error: "Product model is required." }),
    quantity: z.string({ required_error: "Quantity is required." })
      .regex(/^\d+$/, "Quantity must be a valid number.")
      .refine((val) => parseInt(val) > 0, "Quantity must be greater than 0."),
    price: z.string({ required_error: "Price is required." })
      .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number with up to 2 decimal places."),
    customerName: z.string({ required_error: "Customer name is required." }),
    address: z.string({ required_error: "Address is required." }),
    customerEmail: z.string({ required_error: "Customer email is required." })
      .email("Invalid email address."),
    phoneNumber: z.string({ required_error: "Phone number is required." })
      .regex(/^\d{11}$/, "Phone number must be 10 digits."),
  }),
});

const OrderUpdateValidationSchema = z.object({
  body: z.object({
    productName: z.string().optional(),
    productModel: z.string().optional(),
    quantity: z.string()
      .regex(/^\d+$/, "Quantity must be a valid number.")
      .refine((val) => parseInt(val) > 0, "Quantity must be greater than 0.")
      .optional(),
    price: z.string()
      .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number with up to 2 decimal places.")
      .optional(),
    customerName: z.string().optional(),
    address: z.string().optional(),
    customerEmail: z.string()
      .email("Invalid email address.")
      .optional(),
    phoneNumber: z.string()
      .regex(/^\d{10}$/, "Phone number must be 10 digits.")
      .optional(),
  }),
});

export const OrderValidation = {
  OrderCreateValidationSchema,
  OrderUpdateValidationSchema,
};
