const transactionRouter = require("express").Router();
const transactionController = require("../controllers/transaction.controller");
const CheckToken = require("../helpers/middleware/checkToken");

transactionRouter.get(
	"/:id",
	CheckToken,
	transactionController.getTransactionHistory
);
transactionRouter.post(
	"/send",
	CheckToken,
	transactionController.doTransaction
);
transactionRouter.post("/topup", CheckToken, transactionController.topUp);

module.exports = transactionRouter;
