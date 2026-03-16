import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import { PaymentAttributes, PaymentCreateAttributes } from '../dtos/payment-dto';

class Payment
  extends Model<PaymentAttributes, PaymentCreateAttributes>
  implements PaymentAttributes
{
  public id!: string;
  public order_id!: string;
  public amount!: number;
  public status!: 'APPROVED' | 'DECLINED' | 'FAILED';
  public transaction_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: 'ID do pedido vindo do order-service',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('APPROVED', 'DECLINED', 'FAILED'),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payments',
    underscored: true,
    timestamps: true,
  },
);

export default Payment;
