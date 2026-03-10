import { Optional } from 'sequelize';

export interface OrderItemAttributes {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface OrderItemCreate extends Optional<OrderItemAttributes, 'id'> {}
