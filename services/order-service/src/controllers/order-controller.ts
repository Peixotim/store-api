import { Request, Response } from 'express';
import { OrderService } from '../services/order-service';
export class OrderController {
  constructor(private orderService: OrderService) {}
  public async health(req: Request, res: Response) {
    return res.status(200).json({
      message: `API IS RUNNING !`,
    });
  }
}
