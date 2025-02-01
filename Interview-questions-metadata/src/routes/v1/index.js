const express = require("express");
const contentDetailsForPageRoutesItr1 = require("./pages--content-details/itr1");
const serverV1Router = express.Router();

serverV1Router.use("/pages/admin", contentDetailsForPageRoutesItr1);

module.exports = serverV1Router;
