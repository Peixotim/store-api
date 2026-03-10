import { DataTypes, Model } from 'sequelize';
import { OrderItemAttributes, OrderItemCreate } from '../dtos/orderItem-dto';
import sequelize from '../config/squelize';

class OrderItem extends Model<OrderItemAttributes, OrderItemCreate> {
  public id!: string;
  public order_id!: string;
  public product_id!: string;
  public quantity!: number;
  public unit_price!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize, timestamps: true, underscored: true },
);

export default OrderItem;
