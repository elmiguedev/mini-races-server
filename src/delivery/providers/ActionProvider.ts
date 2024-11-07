import { BuyPartModelAction } from "../../core/actions/car/BuyPartModelAction";
import { CreateCarAction } from "../../core/actions/car/CreateCarAction";
import { CreatePartModelAction } from "../../core/actions/car/CreatePartModelAction";
import { GetCarByUserIdAction } from "../../core/actions/car/GetCarByUserIdAction";
import { GetPartModelsAction } from "../../core/actions/car/GetPartModelsAction";
import { GetUserCarPartsAction } from "../../core/actions/car/GetUserCarPartsAction";
import { SetCarPartAction } from "../../core/actions/car/SetCarPartAction";
import { CreateRaceAction } from "../../core/actions/race/CreateRaceAction";
import { GetRaceAction } from "../../core/actions/race/GetRaceAction";
import { GetRaceByUserAction } from "../../core/actions/race/GetRaceByUserAction";
import { GetRacesAction } from "../../core/actions/race/GetRacesAction";
import { JoinRaceAction } from "../../core/actions/race/JoinRaceAction";
import { LeaveRaceAction } from "../../core/actions/race/LeaveRaceAction";
import { PlayerInRaceAction } from "../../core/actions/race/PlayerInRaceAction";
import { PlayerMoveAction } from "../../core/actions/race/PlayerMoveAction";
import { PlayerReadyAction } from "../../core/actions/race/PlayerReadyAction";
import { SendChatMessageAction } from "../../core/actions/race/SendChatMessageAction";
import { GetUserAction } from "../../core/actions/users/GetUserAction";
import { GetUsersAction } from "../../core/actions/users/GetUsersAction";
import { LoginAction } from "../../core/actions/users/LoginAction";
import { RegisterUserAction } from "../../core/actions/users/RegisterUserAction";
import ServiceProvider, { type Services } from "./ServiceProvider";

export interface Actions {
  registerUserAction: RegisterUserAction;
  getUsersAction: GetUsersAction;
  getUserAction: GetUserAction;
  loginAction: LoginAction;
  createRaceAction: CreateRaceAction;
  getRacesAction: GetRacesAction;
  getRaceAction: GetRaceAction;
  joinRaceAction: JoinRaceAction;
  leaveRaceAction: LeaveRaceAction;
  getRaceByUser: GetRaceByUserAction;
  getPartModelsAction: GetPartModelsAction;
  createPartModelAction: CreatePartModelAction;
  buyPartModelAction: BuyPartModelAction;
  getUserCarPartsAction: GetUserCarPartsAction;
  setCarPartAction: SetCarPartAction;
  createCarAction: CreateCarAction;
  getCarByUserIdAction: GetCarByUserIdAction;
  sendChatMessageAction: SendChatMessageAction;
  playerReadyAction: PlayerReadyAction;
  playerInRaceAction: PlayerInRaceAction;
  playerMoveAction: PlayerMoveAction;
}

const ActionProvider = (services: Services): Actions => {
  return {
    registerUserAction: new RegisterUserAction(services.userRepository),
    getUsersAction: new GetUsersAction(services.userRepository),
    getUserAction: new GetUserAction(services.userRepository),
    loginAction: new LoginAction(services.userRepository),
    createRaceAction: new CreateRaceAction(services.raceRepository),
    getRacesAction: new GetRacesAction(services.raceRepository),
    getRaceAction: new GetRaceAction(services.raceRepository),
    joinRaceAction: new JoinRaceAction(services.raceRepository, services.userRepository),
    leaveRaceAction: new LeaveRaceAction(services.raceRepository),
    getRaceByUser: new GetRaceByUserAction(services.raceRepository),
    getPartModelsAction: new GetPartModelsAction(services.carRepository),
    createPartModelAction: new CreatePartModelAction(services.carRepository),
    buyPartModelAction: new BuyPartModelAction(services.carRepository, services.userRepository),
    getUserCarPartsAction: new GetUserCarPartsAction(services.carRepository),
    setCarPartAction: new SetCarPartAction(services.carRepository),
    createCarAction: new CreateCarAction(services.carRepository),
    getCarByUserIdAction: new GetCarByUserIdAction(services.carRepository),
    sendChatMessageAction: new SendChatMessageAction(services.raceRepository),
    playerInRaceAction: new PlayerInRaceAction(services.raceRepository),
    playerMoveAction: new PlayerMoveAction(services.raceRepository),
    playerReadyAction: new PlayerReadyAction(services.raceRepository)
  }
}

export default ActionProvider;