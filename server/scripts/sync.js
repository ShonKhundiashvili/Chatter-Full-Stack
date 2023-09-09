require("dotenv").config();
const sequelize = require("../src/models");
sequelize.sync({ force: true }).then(() => {
  console.log("The sync is done");
});
