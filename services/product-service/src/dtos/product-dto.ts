import { ProductCategory } from '../enums/product-category';
import { Optional } from 'sequelize';

export interface ProductAttributes {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  sku: string;
}

export interface ProductCreate extends Optional<ProductAttributes, 'id'> {}
