import { DataTypes, Model } from 'sequelize';
import { OrderAttributes, OrderCreate } from '../dtos/order-dto';
import { status } from '../enums/order-status';
import sequelize from '../config/squelize';

class Order extends Model<OrderAttributes, OrderCreate> {
  public id!: string;
  public user_id!: string;
  public status!: status;
  public total_price!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(status)),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { sequelize, timestamps: true, underscored: true },
);

export default Order;
