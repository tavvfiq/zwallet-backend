const db = require("../config/db.config");

const userModel = {
	updateUser: (id, body) => {
		return new Promise((resolve, reject) => {
			const userQuery =
				"UPDATE users, user_detail SET ? WHERE users.id = user_detail.user_id AND users.id=?; SELECT id, username, user_detail.image, user_detail.phone_number, user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id WHERE users.id=?;";
			db.query(userQuery, [body, id, id], (err, data) => {
				if (err) {
					reject({ msg: "User not found" });
				}
				resolve(data[1][0]);
			});
		});
	},
	addContact: (body) => {
		return new Promise((resolve, reject) => {
			const addContactQuery =
				"INSERT INTO contacts SET ?;SELECT num_of_contact FROM user_detail WHERE user_detail.user_id = ?;SELECT username FROM users WHERE users.id = ?;";
			db.query(
				addContactQuery,
				[body, body.user_id, body.contact_id],
				(err, data) => {
					console.log(data);
					if (err) {
						reject(err);
					}
					const changeNumOfContact =
						"UPDATE user_detail SET num_of_contact=? WHERE user_detail.user_id = ?;";
					db.query(
						changeNumOfContact,
						[data[1][0].num_of_contact + 1, body.user_id],
						(err) => {
							if (err) {
								console.error(err);
								reject(err);
							}
							resolve({
								msg: `You are now friends with ${data[2][0].username}`,
							});
						}
					);
				}
			);
		});
	},
	getContactList: (query) => {
		const getContactList = "";
	},
};

module.exports = userModel;
