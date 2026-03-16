export interface PaymentAttributes {
  id: string;
  order_id: string;
  amount: number;
  status: 'APPROVED' | 'DECLINED' | 'FAILED';
  transaction_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentCreateAttributes extends Omit<PaymentAttributes, 'id'> {}
