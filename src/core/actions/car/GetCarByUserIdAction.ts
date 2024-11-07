import type { Car } from "../../domain/car/Car";
import type { CarRepository } from "../../repositories/car/CarRepository";
import type { Action } from "../Action";

export class GetCarByUserIdAction implements Action<number, Car[]> {
  constructor(private readonly carRepository: CarRepository) { }
  public async execute(userId: number) {
    return this.carRepository.getCarByUserId(userId);
  }
} 