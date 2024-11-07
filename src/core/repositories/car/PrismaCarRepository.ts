import { PrismaClient } from "@prisma/client";
import type { CarPart } from "../../domain/car/CarPart";
import type { CarSlot } from "../../domain/car/CarSlot";
import type { CarRepository } from "./CarRepository";
import type { Car } from "../../domain/car/Car";
import type { CarPartModel } from "../../domain/car/CarPartModel";


export class PrismaCarRepository implements CarRepository {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createCarSlot(slot: CarSlot): Promise<CarSlot> {
    const newSlot = await this.prisma.carSlot.create({
      data: {
        carId: slot.carId,
        type: slot.type,
        carPartId: slot.carPartId,
      }
    });
    return newSlot as CarSlot;
  }

  public async getCarSlotsByCarId(carId: number): Promise<CarSlot[]> {
    const slots = await this.prisma.carSlot.findMany({
      where: {
        carId
      }
    });
    return slots as CarSlot[];
  }

  public async updateCarSlot(slot: CarSlot): Promise<CarSlot> {
    const updatedSlot = await this.prisma.carSlot.update({
      where: {
        id: slot.id
      },
      data: {
        carId: slot.carId,
        type: slot.type,
        carPartId: slot.carPartId
      }
    });
    return updatedSlot as CarSlot;
  }


  public async getCarPartsByUserId(userId: number): Promise<CarPart[]> {
    const parts = await this.prisma.carPart.findMany({
      where: {
        userId
      },
      include: {
        CarPartModel: true,
      }
    });
    return parts as CarPart[];
  }

  public async createPart(part: CarPart): Promise<CarPart> {
    const newPart = await this.prisma.carPart.create({
      data: {
        userId: part.userId,
        carPartModelId: part.carPartModelId,
        accelerationUpgrade: part.accelerationUpgrade,
        velocityUpgrade: part.velocityUpgrade,
        steeringUpgrade: part.steeringUpgrade,
        resistanceUpgrade: part.resistanceUpgrade
      }
    });
    return newPart as CarPart;
  };

  public async getPartModels(): Promise<CarPartModel[]> {
    const models = await this.prisma.carPartModel.findMany();
    return models as CarPartModel[];
  }

  public async getPartModelById(id: number): Promise<CarPartModel> {
    const model = await this.prisma.carPartModel.findFirst({ where: { id } });
    return model as CarPartModel;
  }

  public async createPartModel(model: CarPartModel): Promise<CarPartModel> {
    const newModel = await this.prisma.carPartModel.create({
      data: {
        name: model.name,
        type: model.type,
        acceleration: model.acceleration,
        velocity: model.velocity,
        steering: model.steering,
        resistance: model.resistance
      }
    });
    return newModel as CarPartModel;
  }

  public async getCarById(carId: number): Promise<Car | undefined> {
    const car = await this.prisma.car.findFirst({
      where: {
        id: carId
      },
      include: {
        CarSlot: true
      }
    });
    if (car === null) {
      return undefined
    }

    return car as Car;
  }

  public async getCarByUserId(userId: number): Promise<Car[]> {
    const cars = await this.prisma.car.findMany({
      where: {
        userId
      },
      include: {
        CarSlot: {
          include: {
            CarPart: {
              include: {
                CarPartModel: true
              }
            }
          }
        }
      }
    });

    return cars as Car[];
  }

  public async getCarPartById(carPartId: number): Promise<CarPart | undefined> {
    const part = await this.prisma.carPart.findFirst({
      where: {
        id: carPartId
      },
      include: {
        CarPartModel: true
      }
    });
    return part as CarPart;
  }

  public async createCar(car: Car): Promise<Car> {
    const newCar = await this.prisma.car.create({
      data: {
        color: car.color,
        userId: car.userId
      }
    });
    return newCar as Car;
  }
}