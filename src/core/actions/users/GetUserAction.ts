import type { User } from "../../domain/user/User";
import type { UserRepository } from "../../repositories/user/UserRepository";
import type { Action } from "../Action";

export class GetUserAction implements Action<number, User | undefined> {
  constructor(private readonly userRepository: UserRepository) { }
  public execute(id: number): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }
}