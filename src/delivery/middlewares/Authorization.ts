import Elysia, { error } from "elysia";

const Authorization = (app: Elysia) =>
  app.derive(async ({ headers, jwt }: any) => {
    const authHeader = headers.authorization;
    if (!authHeader) {
      return error(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return error(401, "Unauthorized");
    }

    const tokenPayload = await jwt.verify(token);
    if (!tokenPayload) {
      return error(401, "Unauthorized");
    }
    // @ts-ignore
    app.ws.user = tokenPayload;
    return token;
  });

export default Authorization;