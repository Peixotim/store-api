import { Optional } from 'sequelize';
import { status } from '../enums/order-status';

export interface OrderAttributes {
  id: string;
  user_id: string;
  status: status;
  total_price: number;
}

export interface OrderCreate extends Optional<OrderAttributes, 'id'> {}

export interface OrderOptional extends Partial<Optional<OrderAttributes, 'id'>> {}
