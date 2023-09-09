const { DataTypes } = require("sequelize");

const init = (sequelize) => {
  return sequelize.define(
    "users",
    {
      email: { primaryKey: true, type: DataTypes.STRING },
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { underscored: true }
  );
};

const associations = (sequelize) => {
  const { messages, users } = sequelize.models;
  users.hasMany(messages, { foreignKey: "author", as: "author" });
  users.hasMany(messages, { foreignKey: "receiver", as: "receiver" });
};

module.exports = { init, associations };
