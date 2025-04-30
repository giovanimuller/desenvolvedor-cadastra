import { Product } from '../ts/Product';

const serverUrl = "/api";

class ProductService {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${serverUrl}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  getImagePath(imageName: string): string {
    return `/img/${imageName}`;
  }
}

export const productService = new ProductService();
