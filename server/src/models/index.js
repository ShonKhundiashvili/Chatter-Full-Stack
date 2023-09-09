const Sequelize = require("sequelize");
const users = require("./users");
const messages = require("./messages");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
users.init(sequelize);
messages.init(sequelize);

messages.associations(sequelize);
users.associations(sequelize);

module.exports = sequelize;
