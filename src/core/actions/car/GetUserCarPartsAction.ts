import type { CarPart } from "../../domain/car/CarPart";
import type { CarRepository } from "../../repositories/car/CarRepository";
import type { Action } from "../Action";

export class GetUserCarPartsAction implements Action<number, CarPart[]> {

  constructor(
    private readonly carRepository: CarRepository
  ) { }

  public execute(userId: number): Promise<CarPart[]> {
    return this.carRepository.getCarPartsByUserId(userId);
  }

}