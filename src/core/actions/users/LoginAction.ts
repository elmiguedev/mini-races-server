import type { User } from "../../domain/user/User";
import type { UserRepository } from "../../repositories/user/UserRepository";
import type { Action } from "../Action";

export interface LoginActionParams {
  email: string;
  password: string;
}

export class LoginAction implements Action<LoginActionParams, User | undefined> {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async execute(input: LoginActionParams): Promise<User | undefined> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) return;
    if (!this.validatePassword(user, input.password)) return;
    return user;
  }

  private validatePassword(user: User, password: string) {
    return Bun.password.verifySync(password, user.password!);
  }
}
