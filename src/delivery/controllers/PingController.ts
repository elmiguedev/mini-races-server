import Elysia from "elysia";
import type { Actions } from "../providers/ActionProvider";
import Authorization from "../middlewares/Authorization";

const PingController = (actions: Actions) => {

  const pingHandler = () => {
    return "pong!"
  }

  return new Elysia()
    .get("/ping", pingHandler)

}

export default PingController;