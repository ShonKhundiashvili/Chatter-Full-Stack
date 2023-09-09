require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const api = require("./api");

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
// app.post("/", (req, res) => {
//   res.send();
// });

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
