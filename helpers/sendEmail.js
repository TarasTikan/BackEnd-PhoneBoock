const nodemailer = require("nodemailer");
require('dotenv').config()

const config = {
  host: "smpt.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "taras0123@meta.ua",
    pass: process.env.PASSWORD
  },
};
const transporter = nodemailer.createTransport(config)

module.exports = transporter