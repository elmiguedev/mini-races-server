import type { CarRepository } from "../../core/repositories/car/CarRepository";
import type { RaceRepository } from "../../core/repositories/races/RaceRepository";
import type { UserRepository } from "../../core/repositories/user/UserRepository";
import { PrismaCarRepository } from "../../core/repositories/car/PrismaCarRepository";
import { InMemoryRaceRepository } from "../../core/repositories/races/InMemoryRaceRepository";
import { PrimsaUserRepository } from "../../core/repositories/user/PrismaUserRepository";

export interface Services {
  raceRepository: RaceRepository;
  userRepository: UserRepository;
  carRepository: CarRepository;
}

const ServiceProvider = () => {
  return {
    raceRepository: new InMemoryRaceRepository(),
    userRepository: new PrimsaUserRepository(),
    carRepository: new PrismaCarRepository()
  }
}

export default ServiceProvider;