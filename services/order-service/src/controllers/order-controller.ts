import { Request, Response } from 'express';
import { OrderService } from '../services/order-service';
import { createOrderSchema, updateOrderStatusSchema } from '../schemas/order-schema';

export class OrderController {
  constructor(private orderService: OrderService) {}

  public async health(req: Request, res: Response) {
    return res.status(200).json({
      message: `API IS RUNNING !`,
    });
  }

  public async createOrder(req: Request, res: Response) {
    try {
      const data = createOrderSchema.parse(req.body);
      const order = await this.orderService.createOrder(data);

      return res.status(201).json(order);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  public async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const order = await this.orderService.findById(id);

      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }

      return res.json(order);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  public async updateOrderStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = updateOrderStatusSchema.parse(req.body);

      await this.orderService.updatedOrderStatus(id, data.status);

      return res.json({
        message: 'Order status updated successfully',
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
