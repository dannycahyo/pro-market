import type { CartRepository } from "../repositories/cartRepository";
import type { Cart, CartItem } from "@prisma/client";
import type {
  CartItemData,
  UpdateCartItemInput,
} from "../schema/Cart";

export class CartItemNotFoundError extends Error {
  constructor() {
    super("Cart item not found or unauthorized");
    this.name = "CartItemNotFoundError";
  }
}

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getUserCart(
    userId: string,
  ): Promise<(Cart & { items: CartItem[] }) | null> {
    return this.cartRepository.findByUserId(userId);
  }

  async addItem(
    userId: string,
    data: CartItemData,
  ): Promise<CartItem> {
    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await this.cartRepository.createCart({ userId });
    }

    const existingItem = await this.cartRepository.findCartItem(
      cart.id,
      data.productId,
    );
    if (existingItem) {
      return this.cartRepository.updateItemQuantity(
        existingItem.id,
        existingItem.quantity + data.quantity,
      );
    }

    return this.cartRepository.addItem({
      cart: { connect: { id: cart.id } },
      product: { connect: { id: data.productId } },
      quantity: data.quantity,
    });
  }

  async removeItem(id: string, userId: string): Promise<void> {
    const item = await this.cartRepository.findCartItem(id, userId);
    if (!item) {
      throw new CartItemNotFoundError();
    }
    await this.cartRepository.deleteItem(id);
  }

  async updateItemQuantity(
    id: string,
    data: UpdateCartItemInput,
    userId: string,
  ): Promise<CartItem> {
    const item = await this.cartRepository.findCartItem(id, userId);
    if (!item) {
      throw new CartItemNotFoundError();
    }
    return this.cartRepository.updateItemQuantity(id, data.quantity);
  }
}
