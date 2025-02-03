import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  image:z.string().optional(),
  brand: z.enum(["Honda", "Yamaha", "Kawasaki"], { message: "Invalid brand" }),
  price: z.string().min(1, "Price is required."),
  model: z.enum(["Sport", "Cruiser", "Touring"], { message: "Invalid model" }),
  category: z.enum(["Superbike", "Adventure", "Commuter"], { message: "Invalid category" }),
  stock: z.string().min(1, "Stock is required."),
});
