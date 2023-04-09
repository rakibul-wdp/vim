const express = require("express");
const { postPicture, getPicture, searchPicture } = require("../controllers/pictureController");

const Router = express.Router();

Router.route("/addPost/:id").post(postPicture);
Router.route("/getPost/:id").get(getPicture).post(searchPicture)

module.exports = Router