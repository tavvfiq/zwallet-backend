const express = require("express");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", userRouter);

module.exports = indexRouter;
