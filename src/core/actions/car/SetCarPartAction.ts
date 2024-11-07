import type { Car } from "../../domain/car/Car";
import type { CarSlot } from "../../domain/car/CarSlot";
import type { CarRepository } from "../../repositories/car/CarRepository";
import type { Action } from "../Action";

export interface SetCarPartActionParams {
  carId: number,
  carPartId: number
}

export class SetCarPartAction implements Action<SetCarPartActionParams, CarSlot> {
  constructor(
    private readonly carRepository: CarRepository
  ) { }

  public async execute(params: SetCarPartActionParams): Promise<CarSlot> {
    // 1. vamo a obtener el car pa ver que slots tiene
    const car = await this.carRepository.getCarById(params.carId);

    // 2. si no hay car, error (TBD)
    // 3. obtenemos la part
    const part = await this.carRepository.getCarPartById(params.carPartId);

    // 4. si no hay part, error (TBD)
    // 5. vemos si hay un slot del tipo de parte que tiene el auto
    const partTypeSlot = car?.CarSlot?.find(slot => slot.type === part?.CarPartModel?.type);
    if (partTypeSlot) {
      return this.carRepository.updateCarSlot({
        id: partTypeSlot.id,
        carId: params.carId,
        carPartId: params.carPartId,
        type: part?.CarPartModel?.type!,
      });
    } else {
      // 5.2 sino, creamos un slot nuevo
      return this.carRepository.createCarSlot({
        carId: params.carId,
        carPartId: params.carPartId,
        type: part?.CarPartModel?.type!,
      });
    }
  }
}