const nodemailer = require("nodemailer");
require('dotenv').config()
const {PASSWORD} = process.env
const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "taras0123@meta.ua",
    pass: PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

module.exports = transporter;