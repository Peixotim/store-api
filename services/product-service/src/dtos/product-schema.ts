import { z } from 'zod';
import { ProductCategory } from '../enums/product-category';

export const createProduct = z.object({
  name: z.string(),
  price: z.number(),
  description: z.number(),
  category: z.enum(ProductCategory),
  stock: z.number(),
  sku: z.string().length(20),
});

export const findSku = z.object({
  sku: z.string().length(20),
});

export const findById = z.object({
  id: z.string().uuid(),
});
