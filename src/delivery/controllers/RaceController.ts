import Elysia, { type Context } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import Authorization from "../middlewares/Authorization";

const RaceController = (actions: Actions) => {

  const getRacesHandler = async (ctx: Context) => {
    console.log(">> entra al handler de get")
    const races = await actions.getRacesAction.execute();
    console.log(">> las races", races)
    return races;
  }

  const createRaceHandler = async (ctx: Context) => {
    console.log(">> entra al handler de create")
    const race = await actions.createRaceAction.execute();
    console.log(">> la race", race)
    return race.getData();
  }

  return new Elysia()
    .use(Authorization)
    .get("/races", getRacesHandler)
    .post("/races", createRaceHandler)

}

export default RaceController;