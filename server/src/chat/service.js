const { models } = require("../models");
const Op = require("sequelize");

module.exports.requestChat = async (req, res) => {
  try {
    const { author, receiver } = req.body;
    const messages = await models.messages.findAll({
      where: {
        author: [author, receiver],
        receiver: [author, receiver],
      },
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error while getting a message");
  }
};

module.exports.postMessage = (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error while getting a message");
  }
};
