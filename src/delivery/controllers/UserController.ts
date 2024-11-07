import Elysia, { type Context } from "elysia";
import type { Actions } from "../providers/ActionProvider";

const UserController = (actions: Actions) => {

  const getUsersHandler = async (ctx: Context) => {
    const users = await actions.getUsersAction.execute();
    return users;
  }

  const getUserByIdHandler = async (ctx: Context) => {
    const userId = Number(ctx.params.id);
    const user = await actions.getUserAction.execute(userId);
    return user;
  }

  return new Elysia()
    .get("/users", getUsersHandler)
    .get("/users/:id", getUserByIdHandler)

}

export default UserController;