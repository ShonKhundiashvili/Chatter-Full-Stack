const { models } = require("../models");

module.exports.requestChat = async (req, res) => {
  try {
    const messages = await models.messages.findAll();
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
