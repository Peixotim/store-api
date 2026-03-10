interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: ProductCategory;
  sku: string;
}

enum ProductCategory {
  ELECTRONICS = 'electronics',
  COMPUTERS = 'computers',
  PHONES = 'phones',
  GAMING = 'gaming',
  ACCESSORIES = 'accessories',
  HOME = 'home',
  FURNITURE = 'furniture',
  CLOTHING = 'clothing',
  SPORTS = 'sports',
  BOOKS = 'books',
  FOOD = 'food',
  BEAUTY = 'beauty',
  HEALTH = 'health',
  AUTOMOTIVE = 'automotive',
  TOYS = 'toys',
  OTHER = 'other',
}
export class ProductRepository {
  private apiBase = 'http://product_service:3003';

  public async findBySku(sku: string): Promise<Product> {
    const response = await fetch(`${this.apiBase}/sku/${encodeURIComponent(sku)}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data as Product;
  }

  public async existsInStock(sku: string): Promise<boolean> {
    const response = await fetch(`${this.apiBase}/exists/${encodeURIComponent(sku)}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data as boolean;
  }

  public async deleteInStock(sku: string): Promise<boolean> {
    const response = await fetch(`${this.apiBase}/stock/${encodeURIComponent(sku)}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data as boolean;
  }

  public async findById(id: string): Promise<Product> {
    const response = await fetch(`${this.apiBase}/id/${encodeURIComponent(id)}`, { method: 'GET' });
    const data = await response.json();
    return data as Product;
  }
}
