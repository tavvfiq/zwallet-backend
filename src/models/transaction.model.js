const db = require("../config/db.config");

const transactionModel = {
	sendMoney: (id, body) => {
		return new Promise((resolve, reject) => {
			const userQuery =
				"UPDATE users SET ? WHERE users.id=?; SELECT id, username, user_detail.image, user_detail.phone_number, user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id WHERE users.id=?;";
			db.query(userQuery, [body, id, id], (err, data) => {
				if (err) {
					reject({ msg: "User not found" });
				}
				resolve(data[1][0]);
			});
		});
	},
};

module.exports = transactionModel;
