const db = require("../config/db.config");

const transactionModel = {
	sendMoney: (body) => {
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
					console.log(resData.insertId);
					//decrease sender balance
					const balanceQuery =
						"SELECT balance FROM user_detail WHERE user_detail.user_id = ?;";
					db.query(
						balanceQuery,
						[body.sender_id],
						(err, resDataSender) => {
							if (err) {
								reject({
									msg:
										"Transaction failed (read sender balance)",
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
											msg:
												"Transaction failed (update sender balance)",
										});
									}
									//increase receiver balance
									db.query(
										balanceQuery,
										[body.receiver_id],
										(err, resDataReceiver) => {
											if (err) {
												reject({
													msg:
														"Transaction failed (read receiver balance)",
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
																"Transaction failed (update receiver balance)",
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
			db.query(topUpQuery, [body, body.sender_id], (err, resData) => {
				if (err) {
					console.log(err);
					reject({
						msg: "Transaction failed (read sender balance)",
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
					[newBalance, body.sender_id],
					(err) => {
						if (err) {
							console.log(err);
							reject({
								msg:
									"Transaction failed (update sender balance)",
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
};
module.exports = transactionModel;
