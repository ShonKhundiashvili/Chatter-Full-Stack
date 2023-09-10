const { models } = require("../models");

module.exports.register = async (req, res) => {
  try {
    const { email, password, username, image } = req.body;
    const existingUser = await models.users.findOne({ where: { email } });
    if (existingUser) return res.status(400).send("The user already exists");

    //const hashedPassword = await bcrypt.hash(password, 10);

    await models.users.create({
      email,
      password,
      username,
      image,
    });

    return res.status(200).send("Registered successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error while registering user");
  }
};
