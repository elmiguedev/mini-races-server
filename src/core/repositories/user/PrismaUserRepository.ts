import { PrismaClient } from "@prisma/client";
import type { User } from "../../domain/user/User";
import type { UserRepository } from "./UserRepository";

export class PrimsaUserRepository implements UserRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async create(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password!
      }
    });
    return newUser as User;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (user === null) {
      return undefined;
    }
    return user as User;
  }
  public async findById(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user === null) {
      return undefined;
    }
    return user as User;
  }

  public async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users as User[];
  }

  public async updateUser(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: user
    });
    return updatedUser as User;
  }

}