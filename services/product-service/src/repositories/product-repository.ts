import { literal, Op } from 'sequelize';
import { ProductCreate } from '../dtos/product-dto';
import Product from '../models/product-model';

export class ProductRepository {
  public async create(data: ProductCreate) {
    return await Product.create({ ...data });
  }

  public async findById(id: string) {
    return await Product.findByPk(id);
  }

  public async existsBySku(sku: string) {
    const product = await Product.count({ where: { sku } });
    return product > 0;
  }

  public async findBySku(sku: string) {
    return await Product.findOne({
      where: { sku },
    });
  }

  public async decrementStock(sku: string) {
    const [rowsUpdated] = await Product.update(
      {
        stock: literal('stock - 1'),
      },
      {
        where: { sku, stock: { [Op.gt]: 0 } },
      },
    );

    return rowsUpdated > 0;
  }
}
