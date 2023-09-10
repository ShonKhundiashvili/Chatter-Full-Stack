const http = require("http");
const { Server } = require("socket.io");

module.exports = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
  io.on("connection", (socket) => {
    socket.on("send-message", (message) =>
      socket.broadcast.emit("receive-message", message)
    );
  });
  return server;
};
