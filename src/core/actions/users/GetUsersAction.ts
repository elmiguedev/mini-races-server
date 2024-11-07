import type { User } from "../../domain/user/User";
import type { UserRepository } from "../../repositories/user/UserRepository";
import type { Action } from "../Action";

export class GetUsersAction implements Action<void, User[]> {
  constructor(private readonly userRepository: UserRepository) { }
  public execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}