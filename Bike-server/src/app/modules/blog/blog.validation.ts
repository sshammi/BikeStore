import { z } from "zod";

const BikeCreateValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required." }),
    image: z.string({ required_error: "Image is required." }),
    brand: z.enum(["Honda", "Yamaha", "Kawasaki"], { required_error: "Brand is required." }),
    price: z.string({ required_error: "Price is required." }),
    model: z.enum(["Sport", "Cruiser", "Touring"], { required_error: "Model is required." }),
    category: z.enum(["Superbike", "Adventure", "Commuter"], { required_error: "Category is required." }),
    stock: z.string({ required_error: "Stock is required." }),
    flashSale: z.string().default("false"),
    trending: z.string().default("false"),
    popular: z.string().default("false"),
    electric: z.string().default("false"),
    upcoming: z.string().default("false"),
  }),
});

const BikeUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    brand: z.enum(["Honda", "Yamaha", "Kawasaki"]).optional(),
    price: z.string().optional(),
    model: z.enum(["Sport", "Cruiser", "Touring"]).optional(),
    category: z.enum(["Superbike", "Adventure", "Commuter"]).optional(),
    stock: z.string().optional(),
    flashSale: z.string().default("false").optional(),
    trending: z.string().default("false").optional(),
    popular: z.string().default("false").optional(),
    electric: z.string().default("false").optional(),
    upcoming: z.string().default("false").optional(),
  }),
});

export const BikeValidation = {
  BikeCreateValidationSchema,
  BikeUpdateValidationSchema,
};
