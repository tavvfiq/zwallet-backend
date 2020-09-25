const transactionRouter = require("express").Router();
const transactionController = require("../controllers/transaction.controller");

transactionRouter.post("/send", transactionController.sendMoney);
transactionRouter.post("/topup", transactionController.topUp);

module.exports = transactionRouter;
