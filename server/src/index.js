require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const api = require("./api");
const socketInit = require("./sockets");

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

const server = socketInit(app);

server.listen(process.env.PORT, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});
