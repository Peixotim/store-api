import Product from '../models/product-model';
import { ProductService } from '../service/product-service';
import { Request, Response } from 'express';

export class ProductController {
  private service = new ProductService();

  public async findAll(req: Request, res: Response) {
    const allProducts: Product[] = await this.service.findAll();
    return res.status(200).json({ allProducts });
  }
}
