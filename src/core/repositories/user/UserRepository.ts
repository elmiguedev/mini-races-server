import type { User } from "../../domain/user/User";

export interface UserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  getAll(): Promise<User[]>;
  updateUser(user: User): Promise<User>;
}