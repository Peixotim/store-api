import { status } from '../enums/order-status';

export interface OrderItemRequestDTO {
  product_id: string;
  quantity: number;
}

export interface CreateOrderRequestDTO {
  user_id: string;
  items: OrderItemRequestDTO[];
}

export interface OrderItemCreateDTO {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface OrderCreateDTO {
  user_id: string;
  status: status;
  total_price: number;
}
