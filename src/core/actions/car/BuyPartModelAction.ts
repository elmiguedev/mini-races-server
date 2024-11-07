import type { CarPart } from "../../domain/car/CarPart";
import type { CarRepository } from "../../repositories/car/CarRepository";
import type { UserRepository } from "../../repositories/user/UserRepository";
import type { Action } from "../Action";

export interface BuyPartModelActionParams {
  userId: number;
  carPartModelId: number;
}

export class BuyPartModelAction implements Action<BuyPartModelActionParams, CarPart> {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository
  ) { }

  public async execute(params: BuyPartModelActionParams): Promise<CarPart> {
    const model = await this.carRepository.getPartModelById(params.carPartModelId);
    if (!model) {
      throw new Error("Model not found");
    }
    const newPart: CarPart = {
      userId: params.userId,
      carPartModelId: params.carPartModelId,
      accelerationUpgrade: 0,
      velocityUpgrade: 0,
      steeringUpgrade: 0,
      resistanceUpgrade: 0
    };

    const carPart = await this.carRepository.createPart(newPart);
    if (!carPart) {
      throw new Error("Failed to create part");
    }

    const user = await this.userRepository.findById(params.userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.money -= model.price;
    await this.userRepository.updateUser(user);
    return carPart;
  }
}