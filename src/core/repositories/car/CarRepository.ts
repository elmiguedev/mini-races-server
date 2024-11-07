import type { Car } from "../../domain/car/Car"
import type { CarPart } from "../../domain/car/CarPart"
import type { CarPartModel } from "../../domain/car/CarPartModel"
import type { CarSlot } from "../../domain/car/CarSlot"

export interface CarRepository {
  getPartModels: () => Promise<CarPartModel[]>
  getPartModelById: (id: number) => Promise<CarPartModel>
  createPartModel: (model: CarPartModel) => Promise<CarPartModel>
  createPart: (part: CarPart) => Promise<CarPart>
  getCarPartsByUserId: (userId: number) => Promise<CarPart[]>
  getCarById: (carId: number) => Promise<Car | undefined>
  getCarByUserId: (userId: number) => Promise<Car[]>
  getCarPartById: (carPartId: number) => Promise<CarPart | undefined>
  createCarSlot: (slot: CarSlot) => Promise<CarSlot>
  getCarSlotsByCarId: (carId: number) => Promise<CarSlot[]>
  updateCarSlot: (slot: CarSlot) => Promise<CarSlot>
  createCar: (car: Car) => Promise<Car>
}