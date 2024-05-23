const pool = require("../config/DBConn");

const SignUpController = async () => {
  console.log("SignUpController Was Hit");
};

const LoginController = async () => {
  console.log("LoginController Was Hit");
};

module.exports = { SignUpController, LoginController };