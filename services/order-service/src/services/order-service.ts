import { CreateOrderRequestDTO } from '../dtos/ order-dto-create';
import { status } from '../enums/order-status';
import { OrderItemsRepository, OrderRepository } from '../repositories/order-repository';
import { ProductRepository } from '../repositories/product-repository';
import { RabbitMQService } from './rabbitmq-service';

export class OrderService {
  constructor(
    private productRepo: ProductRepository,
    private orderRepo: OrderRepository,
    private orderItemRepo: OrderItemsRepository,
    private rabbitMqService: RabbitMQService,
  ) {}

  public async findById(id: string) {
    return await this.orderRepo.findById(id);
  }

  public async updatedOrderStatus(orderId: string, newStatus: status) {
    await this.orderRepo.orderUpdate(orderId, { status: newStatus });
    console.log(`Order ${orderId} updated to the status: ${newStatus}`);
  }

  public async createOrder(request: CreateOrderRequestDTO) {
    let totalAmount = 0;
    const orderItemsToSave = [];

    for (const item of request.items) {
      const product = await this.productRepo.findById(item.product_id);

      if (product.stock < item.quantity) {
        throw new Error(`Product ${product.name} is out of stock.`);
      }

      orderItemsToSave.push({
        product_id: product.id,
        unit_price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await this.orderRepo.create({
      status: status.PENDING,
      total_price: totalAmount,
      user_id: request.user_id,
    });

    const itemsToInsert = orderItemsToSave.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));

    await this.orderItemRepo.bulkCreate(itemsToInsert);

    const eventPayload = {
      order_id: order.id,
      user_id: request.user_id,
      total_price: totalAmount,
    };

    await this.rabbitMqService.publishInQueue('order_created', eventPayload);

    return order;
  }
}
