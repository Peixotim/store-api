import Product from '../models/product-model';
import { ProductService } from '../service/product-service';
import { Request, Response } from 'express';

export class ProductController {
  private service = new ProductService();

  public async health(req: Request, res: Response) {
    return res.status(200).json({
      message: `API is Running !`,
    });
  }

  public async findAll(req: Request, res: Response) {
    const allProducts: Product[] = await this.service.findAll();
    return res.status(200).json(allProducts);
  }

  public async create(req: Request, res: Response) {
    const createProduct = await this.service.create(req.body);
    return res.status(201).json(createProduct);
  }

  public async findBySku(req: Request, res: Response) {
    const { sku } = req.params as { sku: string };
    const product = await this.service.findBySku(sku);
    return res.status(200).json(product);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const product = await this.service.findById(id);
    return res.status(200).json(product);
  }

  public async removeInStock(req: Request, res: Response) {
    const { sku } = req.params as { sku: string };
    const remove = await this.service.removeInStock(sku);
    return res.status(200).json(remove);
  }

  public async existsInStock(req: Request, res: Response) {
    const { sku } = req.params as { sku: string };
    const count = await this.service.existsInStock(sku);

    return res.status(200).json(count); //return true or false
  }
}
