import { z } from 'zod';
import { status } from '../enums/order-status';

export const createOrderSchema = z.object({
  user_id: z.string(),
  items: z.array(
    z.object({
      product_id: z.string(),
      quantity: z.number().min(1),
    }),
  ),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(status),
});
