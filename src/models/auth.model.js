const db = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
	register: (body) => {
		return new Promise((resolve, reject) => {
			const { password } = body;
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					reject({ msg: "unknown error" });
				}
				bcrypt.hash(password, salt, (err, hashedPassword) => {
					if (err) {
						reject({ msg: "unknown error" });
					}
					const registerQuery =
						"INSERT INTO users SET ?;INSERT INTO user_detail SET user_id=LAST_INSERT_ID();SELECT id, username, user_detail.image, user_detail.phone_number, user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id  WHERE users.email=?;";
					const newBody = { ...body, password: hashedPassword };
					db.query(
						registerQuery,
						[newBody, body.email],
						(err, data) => {
							if (!err) {
								try {
									const payload = {
										email: body.email,
									};
									const token = jwt.sign(
										payload,
										process.env.SECRET_KEY
									);
									const {
										id,
										username,
										image,
										phone_number,
										balance,
									} = data[2][0];
									const msg = "Register success";
									resolve({
										id,
										username,
										image,
										phone_number,
										balance,
										msg,
										token,
									});
								} catch (e) {
									console.log(e);
									const msg = "Account Registered";
									reject({ msg });
								}
							} else {
								console.log(err);
								reject({ msg: "account exist" });
							}
						}
					);
				});
			});
		});
	},
	login: (body) => {
		return new Promise((resolve, reject) => {
			const loginQuery =
				"SELECT id, username, email, password, user_detail.phone_number, user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id WHERE email=?;";
			db.query(loginQuery, [body.email], (err, data) => {
				if (err) {
					reject({ msg: "query error" });
				}
				console.log(data);
				if (data.length === 0) {
					const msg = "User not found. Please register first";
					reject({ msg });
				} else {
					bcrypt.compare(
						body.password,
						data[0].password,
						(err, isSame) => {
							if (err) {
								reject({ msg: "unknown error" });
							}
							if (isSame) {
								const {
									id,
									username,
									phone_number,
									image,
									balance,
								} = data[0];
								const payload = {
									email,
								};
								const token = jwt.sign(
									payload,
									process.env.SECRET_KEY
								);
								const msg = "Successfully log in";
								resolve({
									id,
									username,
									image,
									phone_number,
									balance,
									msg,
									token,
								});
							} else {
								reject({ msg: "Wrong password" });
							}
						}
					);
				}
			});
		});
	},
	// userData: (id) => {
	// 	return new Promise((resolve, reject) => {
	// 		const userQuery = `SELECT id, first_name, last_name, profile_image, phone_number, level_id FROM users WHERE users.id=?`;
	// 		database.query(userQuery, [id], (err, data) => {
	// 			if (err) {
	// 				reject({ msg: "User not found" });
	// 			}
	// 			resolve(data);
	// 		});
	// 	});
	// },
	// updateUser: (id, body) => {
	// 	return new Promise((resolve, reject) => {
	// 		const userQuery = `START TRANSACTION;UPDATE users SET ? WHERE users.id=?; SELECT id,first_name, last_name, profile_image, phone_number, level_id FROM users WHERE users.id=?;COMMIT;`;
	// 		database.query(userQuery, [body, id, id], (err, data) => {
	// 			if (err) {
	// 				reject({ msg: "User not found" });
	// 			}
	// 			resolve(data[2][0]);
	// 		});
	// 	});
	// },
};

module.exports = authModel;
