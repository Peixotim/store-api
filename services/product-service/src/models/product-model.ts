import { DataTypes, Model } from 'sequelize';
import { ProductAttributes, ProductCreate } from '../dtos/product-dto';
import { ProductCategory } from '../enums/product-category';
import sequelize from '../config/sequelize';

class Product extends Model<ProductAttributes, ProductCreate> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public price!: number;
  public description!: string;
  public category!: ProductCategory;
  public stock!: number;
  public sku!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(ProductCategory)),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    underscored: true,
  },
);

export default Product;
