import { PaymentCreateAttributes } from '../dtos/payment-dto';
import Payment from '../models/payment';

export class PaymentRepository {
  public async create(payload: PaymentCreateAttributes) {
    return await Payment.create({ ...payload });
  }
}
