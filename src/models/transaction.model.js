const db = require("../config/db.config");
const { DateTime } = require("luxon");

const transactionModel = {
	doTransaction: (body) => {
		return new Promise((resolve, reject) => {
			const transactionModel = "INSERT INTO transaction SET ?;";
			db.query(
				transactionModel,
				[body, body.sender_id],
				(err, resData) => {
					if (err) {
						console.log(err);
						reject({ msg: "Transaction failed (add transaction)" });
					}
					//decrease sender balance
					const balanceQuery =
						"SELECT balance FROM user_detail WHERE user_detail.user_id = ?;";
					db.query(
						balanceQuery,
						[body.sender_id],
						(err, resDataSender) => {
							if (err) {
								reject({
									msg: "Transaction failed",
								});
							}
							const changeBalanceQuery =
								"UPDATE user_detail SET balance=? WHERE user_detail.user_id = ?";
							let newBalance =
								(resDataSender[0].balance === null
									? 0 - Number(body.amount)
									: Number(resDataSender[0].balance)) -
								Number(body.amount);
							db.query(
								changeBalanceQuery,
								[newBalance, body.sender_id],
								(err) => {
									if (err) {
										console.log(err);
										reject({
											msg: "Transaction failed",
										});
									}
									//increase receiver balance
									db.query(
										balanceQuery,
										[body.receiver_id],
										(err, resDataReceiver) => {
											if (err) {
												reject({
													msg: "Transaction failed",
												});
											}
											newBalance =
												(resDataReceiver[0].balance ===
												null
													? 0 + Number(body.amount)
													: Number(
															resDataReceiver[0]
																.balance
													  )) + Number(body.amount);
											db.query(
												changeBalanceQuery,
												[newBalance, body.receiver_id],
												(err) => {
													if (err) {
														reject({
															msg:
																"Transaction failed",
														});
													}
													resolve({
														transId:
															resData.insertId,
														...body,
														amount: Number(
															body.amount
														),
														msg:
															"Transaction Success",
													});
												}
											);
										}
									);
								}
							);
						}
					);
				}
			);
		});
	},
	topUp: (body) => {
		return new Promise((resolve, reject) => {
			const topUpQuery =
				"INSERT INTO transaction SET ?; SELECT balance FROM user_detail WHERE user_detail.user_id = ?;";
			db.query(topUpQuery, [body, body.receiver_id], (err, resData) => {
				if (err) {
					console.log(err);
					reject({
						msg: "Transaction failed",
					});
				}
				const addBalanceQuery =
					"UPDATE user_detail SET balance=? WHERE user_detail.user_id = ?;";
				const newBalance =
					resData[1][0].balance === null
						? 0 + Number(body.amount)
						: Number(resData[1][0].balance) + Number(body.amount);
				db.query(
					addBalanceQuery,
					[newBalance, body.receiver_id],
					(err) => {
						if (err) {
							console.log(err);
							reject({
								msg: "Top Up failed",
							});
						}
						resolve({
							transId: resData[0].insertId,
							transaction_name: body.transaction_name,
							amount: Number(body.amount),
							msg: "Top Up success",
						});
					}
				);
			});
		});
	},
	getTransactionHistory: (id, query) => {
		return new Promise((resolve, reject) => {
			const startOfTheWeek = DateTime.local().startOf("week").toISODate();
			const endOfTheWeek = DateTime.local()
				.startOf("week")
				.plus({ days: 7 })
				.toISODate();
			console.log(startOfTheWeek, endOfTheWeek);
			const getHistoryQuery =
				"SELECT users.id, users.username, user_detail.image, transaction.transaction_name, transaction.transaction_type, transaction.amount FROM users JOIN user_detail ON users.id = user_detail.user_id JOIN transaction ON users.id = transaction.sender_id WHERE transaction.receiver_id = ? AND transaction.date BETWEEN ? AND ?; SELECT users.id, users.username, user_detail.image, transaction.transaction_name, transaction.transaction_type, transaction.amount FROM users JOIN user_detail ON users.id = user_detail.user_id JOIN transaction ON users.id = transaction.receiver_id WHERE transaction.sender_id = ? AND transaction.date BETWEEN ? AND ?; SELECT users.id, users.username, user_detail.image, transaction.transaction_name, transaction.transaction_type, transaction.amount FROM users JOIN user_detail ON users.id = user_detail.user_id JOIN transaction ON users.id = transaction.receiver_id WHERE transaction.receiver_id = ? AND transaction.transaction_name = ? AND transaction.date BETWEEN ? AND ?;";
			db.query(
				getHistoryQuery,
				[
					id,
					startOfTheWeek,
					endOfTheWeek,
					id,
					startOfTheWeek,
					endOfTheWeek,
					id,
					"Top Up",
					startOfTheWeek,
					endOfTheWeek,
				],
				(err, data) => {
					if (err) {
						console.error(err);
						reject(err);
					}
					const transHistory = [
						...data[0].map((item) => {
							return { ...item, transaction_type: "in" };
						}),
						...data[1],
						...data[2],
					];
					resolve(transHistory);
				}
			);
		});
	},
};
module.exports = transactionModel;
