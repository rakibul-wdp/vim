const express = require("express");
const { login, register } = require("../controllers/userController");

const Router = express.Router();

Router.route("/signup").post(register);
Router.route("/login").post(login)


module.exports = Router;