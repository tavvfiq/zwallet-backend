const transactionRouter = require("express").Router();
const transactionController = require("../controllers/transaction.controller");
const CheckToken = require("../helpers/middleware/checkToken");
const handleFormData = require("../helpers/middleware/handleFormData");

transactionRouter.get(
	"/:id",
	CheckToken,
	transactionController.getTransactionHistory
);
transactionRouter.post(
	"/send",
	CheckToken,
	handleFormData().none(),
	transactionController.doTransaction
);
transactionRouter.post(
	"/topup",
	CheckToken,
	handleFormData().none(),
	transactionController.topUp
);

module.exports = transactionRouter;
