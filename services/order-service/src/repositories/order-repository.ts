import { OrderCreateDTO, OrderItemCreateDTO } from '../dtos/ order-dto-create';
import Order from '../models/order';
import OrderItem from '../models/orderItem';
import { OrderOptional } from '../dtos/order-dto';

export class OrderRepository {
  public async create(request: OrderCreateDTO) {
    return await Order.create({ ...request });
  }

  public async orderUpdate(orderId: string, schema: OrderOptional) {
    return await Order.update(schema, { where: { id: orderId } });
  }

  public async findById(id: string) {
    return await Order.findByPk(id);
  }
}

//OrderItems
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
