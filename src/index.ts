// 1. init services

// 2. init actions

// 3. init server
const port = 3000;
const server = Bun.serve({
  port,
  static: {
    "/ping": new Response("pong!"),
  },

  fetch(req) {
    return new Response("404!");
  },
});

console.log(`Listening on http://localhost:${port}`);