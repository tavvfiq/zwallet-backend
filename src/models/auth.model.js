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
						"INSERT INTO users SET ?;INSERT INTO user_detail SET user_id=LAST_INSERT_ID();SELECT id, username, pin, user_detail.image, user_detail.phone_number, user_detail.num_of_contact, user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id  WHERE users.email=?;";
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
										process.env.SECRET_KEY,
										{
											expiresIn: "2h",
										}
									);
									const {
										id,
										username,
										pin,
										image,
										phone_number,
										num_of_contact,
										balance,
									} = data[2][0];
									const msg = "Register success";
									resolve({
										id,
										username,
										pin,
										image,
										phone_number,
										num_of_contact,
										balance: Number(balance),
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
				"SELECT id, username, email, password, pin, user_detail.image, user_detail.phone_number, user_detail.num_of_contact,user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id WHERE email=?;";
			db.query(loginQuery, [body.email], (err, data) => {
				if (err) {
					reject({ msg: "query error" });
				}
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
									pin,
									phone_number,
									image,
									num_of_contact,
									balance,
								} = data[0];
								const payload = {
									email: body.email,
								};
								const token = jwt.sign(
									payload,
									process.env.SECRET_KEY,
									{
										expiresIn: "2h",
									}
								);
								const msg = "Successfully log in";
								resolve({
									id,
									username,
									pin,
									image,
									phone_number,
									num_of_contact,
									balance: Number(balance),
									msg,
									token,
								});
							} else {
								reject({ msg: "Wrong email or password" });
							}
						}
					);
				}
			});
		});
	},
};

module.exports = authModel;
