const formResponse = require("../helpers/form/responseForm");
const transactionModel = require("../models/transaction.model");
const transansactionModel = require("../models/transaction.model");

const transactionController = {
	doTransaction: (req, res) => {
		transansactionModel
			.doTransaction(req.body)
			.then((data) => {
				formResponse.success(res, data, 200);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
	topUp: (req, res) => {
		transactionModel
			.topUp(req.body)
			.then((data) => {
				formResponse.success(res, data, 200);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
	getTransactionHistory: (req, res) => {
		transactionModel
			.getTransactionHistory(req.params.id, req.query)
			.then((transactions) => {
				formResponse.paginationTransaction(
					req.params.id,
					req.query,
					res,
					{ transactions },
					200
				);
			})
			.catch((err) => {
				// console.log(err);
				formResponse.error(res, err, 500);
			});
	},
};

module.exports = transactionController;
