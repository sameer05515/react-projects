const express = require("express");
const contentDetailsForAPIRoutesItr1 = require("./api--smart-content/itr1");
const contentDetailsForAPIRoutesItr2 = require("./api--smart-content/itr2");

const serverV2Router = express.Router();

serverV2Router.use("/api", contentDetailsForAPIRoutesItr1);
serverV2Router.use("/api", contentDetailsForAPIRoutesItr2);

module.exports = serverV2Router;
