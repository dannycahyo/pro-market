import type { CartRepository } from "../repositories/cartRepository";
import type { Cart } from "@prisma/client";
import type {
  CreateCartItemInput,
  UpdateCartItemInput,
} from "../schema/Cart";

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getUserCart(userId: string): Promise<Cart[]> {
    return this.cartRepository.findByUserId(userId);
  }

  async addItem(data: CreateCartItemInput): Promise<Cart> {
    return this.cartRepository.create(data);
  }

  async removeItem(id: string): Promise<void> {
    await this.cartRepository.delete(id);
  }

  async updateItemQuantity(
    id: string,
    data: UpdateCartItemInput,
  ): Promise<Cart> {
    return this.cartRepository.update(id, data.quantity);
  }
}
