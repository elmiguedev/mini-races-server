import type { User } from "../user/User";
import type { CarPartModel } from "./CarPartModel";

export interface CarPart {
  id?: number;
  createdAt?: Date;
  userId: number;
  carPartModelId: number;
  accelerationUpgrade: number;
  velocityUpgrade: number;
  steeringUpgrade: number;
  resistanceUpgrade: number;
  CarPartModel?: CarPartModel;
  User?: User;
}

