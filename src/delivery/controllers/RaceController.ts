import Elysia, { type Context } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import Authorization from "../middlewares/Authorization";

const RaceController = (actions: Actions) => {

  const getRacesHandler = async (ctx: Context) => {
    const races = await actions.getRacesAction.execute();
    return races;
  }

  const createRaceHandler = async (ctx: Context) => {
    const race = await actions.createRaceAction.execute();
    return race.getData();
  }

  return new Elysia()
    .use(Authorization)
    .get("/races", getRacesHandler)
    .post("/races", createRaceHandler)

}

export default RaceController;