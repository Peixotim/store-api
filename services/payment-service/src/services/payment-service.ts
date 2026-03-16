import { RabbitMQService } from './rabbitmq-service';
import { PaymentRepository } from '../repositories/payment-service';
export class PaymentService {
  constructor(private rabbitMQ: RabbitMQService) {}
  private paymentRepo: PaymentRepository = new PaymentRepository();

  public async processPayment(order: any) {
    const isApproved = Math.random() > 0.2;

    await this.paymentRepo.create({
      order_id: order.order_id,
      amount: order.total_price,
      status: isApproved ? 'APPROVED' : 'DECLINED',
      transaction_id: `TX-${Date.now()}`,
    });

    await this.rabbitMQ.publishInQueue('payment_finished', {
      order_id: order.order_id,
      status: isApproved ? 'PAID' : 'CANCELED',
    });
  }
}
