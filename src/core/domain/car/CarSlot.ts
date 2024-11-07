import type { Car } from "./Car";
import type { CarPart } from "./CarPart";
import type { CarPartType } from "./CarPartType";

export interface CarSlot {
  id?: number;
  createdAt?: Date;
  carId: number;
  carPartId: number;
  type: CarPartType;
  Car?: Car;
  CarPart?: CarPart;
}