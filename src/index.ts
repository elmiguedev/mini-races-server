import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import ServiceProvider from "./delivery/providers/ServiceProvider";
import ActionProvider from "./delivery/providers/ActionProvider";
import cors from "@elysiajs/cors";
import UserController from "./delivery/controllers/UserController";
import RaceController from "./delivery/controllers/RaceController";
import PingController from "./delivery/controllers/PingController";

// 1. init services
const services = ServiceProvider();

// 2. init actions
const actions = ActionProvider(services);

// 3. create app
const port = 3000;
const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(UserController(actions))
  .use(RaceController(actions))
  .use(PingController(actions))

  .ws("/cws/:id", {

    open(ws) {
      console.log("## socket conectado - sala:", ws.data.params.id);
      const roomId = ws.data.params.id;
      const roomName = "room-" + roomId;
      ws.subscribe(roomName);
      ws.publish(roomName, "usuario conectado");
    },
    message(ws, data: any) {
      const roomId = ws.data.params.id;
      const roomName = "room-" + roomId;
      console.log(`(${ws.data.params.id}) ## ${data.key}: ${data.data} (socket id: ${ws.id})`);
      ws.publish(roomName, data);
      ws.send(data);
    },

  })
  .ws("/ws", {
    message(ws, data: any) {
      console.log(`>> ${data.key}: ${data.data}`);
    },
    open(ws) {
      console.log(">> open");
    }
  })
  .listen(port, () => {
    console.log(`Listening server on http://localhost:${port}`);
  });