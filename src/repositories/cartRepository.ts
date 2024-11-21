import type { PrismaClient, Cart } from "@prisma/client";
import type { CreateCartItemInput } from "../schema/Cart";

export class CartRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async create(data: CreateCartItemInput): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cart.delete({ where: { id } });
  }

  async update(id: string, quantity: number): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id },
      data: { quantity },
    });
  }
}
