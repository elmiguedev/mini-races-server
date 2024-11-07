import type { User } from "../../domain/user/User";
import type { UserRepository } from "../../repositories/user/UserRepository";
import type { Action } from "../Action";

export interface RegisterUserActionParams {
  email: string;
  password: string;
}

export class RegisterUserAction implements Action<RegisterUserActionParams, User> {

  constructor(private readonly userRepository: UserRepository) {

  }

  public execute(params: RegisterUserActionParams): Promise<User> {
    const user: User = {
      email: params.email,
      name: params.email,
      password: this.hashPassword(params.password),
      createdAt: new Date(),
      money: 0,
    };
    return this.userRepository.create(user);
  }

  private hashPassword(password: string) {
    const hashedPassword = Bun.password.hashSync(password);
    return hashedPassword;
  }
}