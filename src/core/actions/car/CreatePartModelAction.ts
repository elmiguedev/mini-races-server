import type { CarPartModel } from "../../domain/car/CarPartModel";
import type { CarPartType } from "../../domain/car/CarPartType";
import type { CarRepository } from "../../repositories/car/CarRepository";
import type { Action } from "../Action";

export interface CreatePartModelActionParams {
  name: string;
  type: CarPartType;
  acceleration: number;
  velocity: number;
  steering: number;
  resistance: number;
}

export class CreatePartModelAction implements Action<CreatePartModelActionParams, CarPartModel> {
  constructor(
    private readonly carRepository: CarRepository
  ) { }

  public execute(params: CreatePartModelActionParams): Promise<CarPartModel> {
    const partModel: CarPartModel = {
      name: params.name,
      acceleration: params.acceleration,
      price: 0,
      resistance: params.resistance,
      steering: params.steering,
      type: params.type,
      velocity: params.velocity,
      createdAt: new Date()
    }
    return this.carRepository.createPartModel(partModel);
  }
}