require("dotenv").config();
const sequelize = require("../src/models");
// sequelize.models.users.create({ email: "shon@gmail.com" });
// sequelize.models.users.create({ email: "tomer@gmail.com" });
sequelize.models.messages.create({
  author: "shon@gmail.com",
  receiver: "tomer@gmail.com",
  message: "Hey Tomer hru?",
});
sequelize.models.messages.create({
  author: "tomer@gmail.com",
  receiver: "shon@gmail.com",
  message: "Hey shon i am ok wbu?",
});
