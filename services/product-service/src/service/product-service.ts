import { ProductCreate } from '../dtos/product-dto';
import {
  BadRequestError,
  ConflictError,
  HttpError,
  InternalServerError,
  NotFoundError,
} from '../errors/http-errors';
import { ProductRepository } from '../repositories/product-repository';
import Product from '../models/product-model';

export class ProductService {
  private readonly productRepository = new ProductRepository();

  public async create(payload: ProductCreate): Promise<Product> {
    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequestError(`Payload is empty !`);
    }
    try {
      const existsSku = await this.productRepository.findBySku(payload.sku);

      if (existsSku) {
        throw new ConflictError(`Product with this SKU already exists`);
      }

      const newProduct = await this.productRepository.create(payload);
      return newProduct;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async existsInStock(sku: string): Promise<boolean> {
    try {
      const product = await this.productRepository.findBySku(sku);

      if (!product) {
        throw new NotFoundError(`Product Not Found !`);
      }

      return product.stock > 0;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async findBySku(sku: string): Promise<Product> {
    if (!sku) {
      throw new BadRequestError(`Payload is empty !`);
    }

    try {
      const product = await this.productRepository.findBySku(sku);
      if (!product) {
        throw new NotFoundError(`Product with this SKU is not found !`);
      }
      return product;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }

  public async removeInStock(sku: string): Promise<boolean> {
    try {
      const updated = await this.productRepository.decrementStock(sku);

      if (!updated) {
        throw new BadRequestError('Product out of stock or not found');
      }

      return true;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new InternalServerError(`Unexpected error: ${error}`);
    }
  }
}
