import OrderItem from '../models/orderItem';
import Order from '../models/order';

Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'items',
});
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order',
});

export { Order, OrderItem };
