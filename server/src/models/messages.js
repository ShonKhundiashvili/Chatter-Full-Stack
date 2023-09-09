const { DataTypes } = require("sequelize");

const init = (sequelize) => {
  return sequelize.define(
    "messages",
    {
      message: DataTypes.STRING,
    },
    { underscored: true }
  );
};

const associations = (sequelize) => {
  const { messages, users } = sequelize.models;
  messages.belongsTo(users, { foreignKey: "author" });
  messages.belongsTo(users, { foreignKey: "receiver" });
};

module.exports = { init, associations };
