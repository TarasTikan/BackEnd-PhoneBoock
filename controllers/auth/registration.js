const user = require("../../models/userShema");
const { HttpError, transporter } = require("../../helpers/index");
const { addShemaAuth } = require("../../JoiShems/index");
const gravatar = require("gravatar");
const nanoid = require("nanoid");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { BASE_URL } = process.env;
const registration = async (req, res) => {
  const { error } = addShemaAuth.validate(req.body);
  if (error) {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(email);
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const verifyCode = nanoid();
    const result = await user.create({
      email,
      password: hashPassword,
      avatarURL,
      verifyCode,
    });
    const verifyEmail = {
      from: "taras0123@meta.ua",
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verifyCode}">Click verify email</a>`,
    };
    transporter
      .sendMail(verifyEmail)
      .then((info) => console.log(info))
      .catch((err) => console.log(err));
    res
      .status(201)
      .json({ email: result.email, subscription: result.subscription });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw HttpError(409, "Email in use");
    }
  }
};

module.exports = registration;
