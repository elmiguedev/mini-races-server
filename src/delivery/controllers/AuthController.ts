import Elysia, { error, type Context } from "elysia";
import type { Actions } from "../providers/ActionProvider";
import jwt from "@elysiajs/jwt";

const AuthController = (actions: Actions) => {

  const loginHandler = async (ctx: Context & { jwt: any }) => {
    const formData: any = ctx.body;

    if (!formData.email || !formData.password) {
      return error(400, "Missing username or password");
    }

    const user = await actions.loginAction.execute({
      email: formData.email,
      password: formData.password
    });

    if (!user) {
      return error(401, "Invalid username or password");
    }

    const token = await ctx.jwt.sign({
      id: user?.id
    });

    return token;
  }

  const registerHandler = async (ctx: Context & { jwt: any }) => {
    const formData: any = ctx.body;

    if (!formData.email || !formData.password) {
      return error(400, "Missing username or password");
    }

    const user = await actions.registerUserAction.execute({
      email: formData.email,
      password: formData.password
    });

    const token = await ctx.jwt.sign({
      id: user?.id
    });

    return token;
  }

  return new Elysia()
    .use(jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET as string,
    }))
    .post("/auth/login", loginHandler)
    .post("/auth/register", registerHandler)

}

export default AuthController;