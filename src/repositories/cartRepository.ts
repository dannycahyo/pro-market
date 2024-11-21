import type {
  PrismaClient,
  Cart,
  CartItem,
  Prisma,
} from "@prisma/client";
import type {
  CreateCartInput,
  CreateCartItemInput,
} from "../schema/Cart";

export class CartRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserId(
    userId: string,
  ): Promise<(Cart & { items: CartItem[] }) | null> {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async createCart(
    data: CreateCartInput,
  ): Promise<Cart & { items: CartItem[] }> {
    return this.prisma.cart.create({
      data,
      include: {
        items: true,
      },
    });
  }

  async addItem(data: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.prisma.cartItem.create({
      data,
      include: { product: true },
    });
  }

  async deleteItem(id: string): Promise<void> {
    await this.prisma.cartItem.delete({ where: { id } });
  }

  async updateItemQuantity(
    id: string,
    quantity: number,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
      include: { product: true },
    });
  }

  async findCartItem(
    cartItemId: string,
    userId: string,
  ): Promise<CartItem | null> {
    return this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cart: {
          userId,
        },
      },
      include: { product: true },
    });
  }
}
