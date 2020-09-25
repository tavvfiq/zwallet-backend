const transactionRouter = require("express").Router();
const transactionController = require("../controllers/transaction.controller");

transactionRouter.get("/", transactionController.getTransactionHistory);
transactionRouter.post("/send", transactionController.doTransaction);
transactionRouter.post("/topup", transactionController.topUp);

module.exports = transactionRouter;
