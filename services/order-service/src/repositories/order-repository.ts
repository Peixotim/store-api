import { OrderCreateDTO, OrderItemCreateDTO } from '../dtos/ order-dto-create';
import Order from '../models/order';
import OrderItem from '../models/orderItem';

export class OrderRepository {
  public async create(request: OrderCreateDTO) {
    return await Order.create({ ...request });
  }
}

export class OrderItemsRepository {
  public async create(request: OrderItemCreateDTO) {
    return await OrderItem.create({
      ...request,
    });
  }

  public async bulkCreate(requests: OrderItemCreateDTO[]) {
    return await OrderItem.bulkCreate(requests);
  }
}
