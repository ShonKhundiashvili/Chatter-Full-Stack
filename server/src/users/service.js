const { models } = require("../models");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { email, password, username, image } = req.body;
    const existingUser = await models.users.findOne({ where: { email } });
    if (existingUser) return res.status(400).send("The user already exists");

    const token = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const magicLink = `http://localhost:8080/api/users/activate?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Account Activation - AttackOmeter",
      html: `
        <p>Click the following button to activate your account:</p>
        <a href="${magicLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Activate Account</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send(
            "An error occurred while sending the link try again later please"
          );
      }
      console.log("Magic link sent:", info.response);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send(
          "Registration successful. Check your email for the magic link to activate your account."
        );
    });

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

module.exports.activate = async (req, res) => {
  try {
    const { email } = req.user;
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await models.users.findOne({ where: { email } });
    if (!existingUser)
      return res.status(404).send("You are not registered please sign up");

    if (password != existingUser.password)
      return res
        .status(400)
        .send("Email or password are wrong please try again");

    const token = jwt.sign({ email }, process.env.JWT_KEY);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .send("Login succeeded");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmationPassword } = req.body;
    const { email } = req.user;
    const user = await models.users.findOne({ where: { email } });
    if (oldPassword !== user.password)
      return res
        .status(400)
        .send("You entered incorrect old password please try again");

    if (newPassword !== confirmationPassword)
      return res
        .status(400)
        .send(
          "New password and confirm new password do not match please try again"
        );
    return res.status(200).send("Passwords are changed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.forgotPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await models.users.findOne({ where: { email } });

    if (!user) return res.status(404).send("Error: User does not exist");

    const token = jwt.sign({ email }, process.env.JWT_KEY);
    const magicLink = `http://localhost:8080/api/users/changeForgottenPassword?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgot Password? Change it here - Chatter App",
      html: `
        <p>Click the following button to change your password</p>
        <a href="${magicLink}" style="display: inline-block; background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Change Password</a>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .send(
            "An error occurred while sending the link try again later please"
          );
      }
      console.log("Magic link sent:", info.response);
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .send("Please check your email in order to change your password");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error in server please try again later");
  }
};

module.exports.changeForgottenPassword = async function (req, res) {
  try {
    const { newPassword, newConfirmPassword } = req.body;
    const { email } = req.user;

    if (newPassword !== newConfirmPassword)
      return res
        .status(400)
        .send(
          "The new password and the confirm password do not match please try again"
        );

    const user = await models.users.findOne({ where: { email } });
    await user.update({ password: newPassword });

    return res.status(200).send("The password is changed succesfully");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Error changing password please try again later");
  }
};
