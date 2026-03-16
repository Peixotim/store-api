import { PaymentService } from '../services/payment-service';
import { Request, Response } from 'express';

export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  public async health(req: Request, res: Response) {
    return res.status(200).json({
      message: `API IS RUNNING !`,
    });
  }
}
