import { z } from 'zod';

export const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required").optional(),
  //image: z.string().min(1, "Product name is required").optional(),
  brand: z.enum(['Honda', 'Yamaha', 'Kawasaki']).optional(),
  model: z.enum(['Sport', 'Cruiser', 'Touring']).optional(),
  category: z.enum(['Superbike', 'Adventure', 'Commuter']).optional(),
  price: z.string().min(1, "Price is required").optional(),
  stock: z.string().min(1, "Stock quantity is required").optional(),
});

export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>;
