const express = require("express");
const authRouter = require("./auth.route");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

module.exports = indexRouter;
