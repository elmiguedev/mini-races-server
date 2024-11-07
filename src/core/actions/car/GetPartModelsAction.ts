import type { CarPartModel } from "../../domain/car/CarPartModel";
import type { CarRepository } from "../../repositories/car/CarRepository";
import type { Action } from "../Action";

export class GetPartModelsAction implements Action<void, CarPartModel[]> {

  constructor(
    private readonly carRepository: CarRepository
  ) { }

  execute(): Promise<CarPartModel[]> {
    return this.carRepository.getPartModels();
  }

}