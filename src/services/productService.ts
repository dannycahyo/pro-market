import type { ProductRepository } from "../repositories/productRepository";
import type { Product } from "@prisma/client";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
