import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import cors from "@elysiajs/cors";
import ServiceProvider from "./delivery/providers/ServiceProvider";
import ActionProvider from "./delivery/providers/ActionProvider";
import UserController from "./delivery/controllers/UserController";
import RaceController from "./delivery/controllers/RaceController";
import PingController from "./delivery/controllers/PingController";
import RaceGameController from "./delivery/controllers/RaceGameController";
import AuthController from "./delivery/controllers/AuthController";
import Authorization from "./delivery/middlewares/Authorization";

// 1. init services
const services = ServiceProvider();

// 2. init actions
const actions = ActionProvider(services);

// 3. create app
const port = 3000;
const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(AuthController(actions))
  .use(UserController(actions))
  .use(RaceController(actions))
  .use(PingController(actions))
  .use(RaceGameController(actions))
  .listen(port, () => {
    console.log(`Listening server on http://localhost:${port}`);
  });