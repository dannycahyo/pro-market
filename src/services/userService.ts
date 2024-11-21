import type { UserRepository } from "../repositories/userRepository";
import type { User } from "@prisma/client";
import type { CreateUserInput } from "../schema/User";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    return this.userRepository.create(data);
  }
}
