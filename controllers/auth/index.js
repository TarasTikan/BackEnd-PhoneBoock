const login = require("./login");
const registration = require("./registration");
const getInfoUser = require("./getInfoUser");
const logout = require("./logout");
const updateAvatar = require('./updateAvatar')
const verifyEmail = require("./verifyEmail")
const recendVerifyEmail = require('./recendVerifyEmail')
module.exports = {
  login,
  registration,
  getInfoUser,
  logout,
  updateAvatar,
  verifyEmail,
  recendVerifyEmail,
};
