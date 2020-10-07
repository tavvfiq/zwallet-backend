const db = require("../config/db.config");
const _ = require("underscore");
const bcrypt = require("bcrypt");
const mailer = require("nodemailer");
const cryptoJS = require("crypto-js");

const transporter = mailer.createTransport({
	service: "gmail",
	auth: {
		user: "taufiqwidinugroho@gmail.com",
		pass: process.env.EMAIL_TOKEN,
	},
});

const userModel = {
	updateUser: (id, body) => {
		return new Promise((resolve, reject) => {
			if (body.password !== undefined) {
				const changePasswordQuery =
					"SELECT password from users WHERE users.id = ?";
				db.query(changePasswordQuery, [id], (err, result) => {
					if (err) {
						reject({ msg: "User not found!" });
					}
					bcrypt.compare(
						body.password,
						result[0].password,
						(err, isSame) => {
							if (err) {
								reject({ msg: "Unknown Error" });
							}
							if (isSame) {
								bcrypt.genSalt(10, (err, salt) => {
									bcrypt.hash(
										body.newPassword,
										salt,
										(err, hashedPassword) => {
											if (err) {
												reject({
													msg: "unknown error",
												});
											}
											const newPasswordQuery =
												"UPDATE users SET ? WHERE users.id = ?;";
											db.query(
												newPasswordQuery,
												[
													{
														password: hashedPassword,
													},
													id,
												],
												(err) => {
													if (err) {
														reject({
															msg:
																"Unknown Error",
														});
													}
													resolve({
														msg:
															"Change password success",
													});
												}
											);
										}
									);
								});
							} else {
								reject({ msg: "Wrong password" });
							}
						}
					);
				});
			} else if (body.newPassword !== undefined) {
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(
						body.newPassword,
						salt,
						(err, hashedPassword) => {
							if (err) {
								reject({
									msg: "unknown error",
								});
							}
							const newPasswordQuery =
								"UPDATE users SET ? WHERE email = ?;";
							db.query(
								newPasswordQuery,
								[
									{
										password: hashedPassword,
									},
									body.email,
								],
								(err) => {
									if (err) {
										reject({
											msg: "Unknown Error",
										});
									}
									resolve({
										msg: "Reset password success",
									});
								}
							);
						}
					);
				});
			} else if (body.email !== undefined) {
				const checkEmailQuery =
					"SELECT username FROM users WHERE email=?;";
				db.query(checkEmailQuery, [body.email], (err, res) => {
					if (err) {
						reject({ msg: "Server error" });
					}
					if (res.length === 0) {
						reject({ msg: "Email not found" });
					} else {
						const encryptedEmail = cryptoJS.AES.encrypt(
							body.email,
							process.env.RESET_PASSWORD_KEY
						).toString();
						const mailOptions = {
							from: "taufiqwidinugroho@gmail.com",
							to: body.email,
							subject: "Reset Password",
							html: `<p>here is your reset password link. please open it in your phone and keep it secret!.\n</p><p>zwalletapp://ResetPassword/${body.email}</p>`,
						};
						// console.log(encryptedEmail);
						transporter.sendMail(mailOptions, (error) => {
							if (error) {
								reject({ msg: "Connection error." });
								console.log(error);
							} else {
								resolve({
									msg:
										"Reset password link sent. Please check your email.",
								});
							}
						});
					}
				});
			} else if (body.newPin !== undefined) {
				const newPinQuery = "UPDATE users SET ? WHERE users.id = ?;";
				db.query(newPinQuery, [{ pin: body.newPin }, id], (err) => {
					if (err) {
						reject({
							msg: "Unknown Error",
						});
					}
					resolve({
						pin: body.newPin,
						msg: "Change PIN success",
					});
				});
			} else {
				const userQuery =
					"UPDATE users, user_detail SET ? WHERE users.id = user_detail.user_id AND users.id=?; SELECT id, username, email, pin, user_detail.image, user_detail.phone_number FROM users JOIN user_detail ON users.id = user_detail.user_id WHERE users.id=?;";
				db.query(
					userQuery,
					[body, Number(id), Number(id)],
					(err, data) => {
						if (err) {
							reject({ msg: "User not found" });
						}
						resolve(data[1][0]);
					}
				);
			}
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
					if (err) {
						reject(err);
					}
					const changeNumOfContact =
						"UPDATE user_detail SET num_of_contact=? WHERE user_detail.user_id = ?;SELECT num_of_contact FROM user_detail WHERE user_detail.user_id = ?";
					db.query(
						changeNumOfContact,
						[
							data[1][0].num_of_contact + 1,
							body.user_id,
							body.contact_id,
						],
						(err, res) => {
							if (err) {
								reject(err);
							}
							db.query(
								"UPDATE user_detail SET num_of_contact=? WHERE user_detail.user_id = ?;",
								[res[1][0].num_of_contact + 1, body.contact_id],
								(err) => {
									if (err) {
										reject(err);
									}
									resolve({
										msg: `You are now friend with ${data[2][0].username}`,
									});
								}
							);
						}
					);
				}
			);
		});
	},
	getContactList: (id, query) => {
		return new Promise((resolve, reject) => {
			const offset = (Number(query.page) - 1) * Number(query.limit);
			const getContactList = `SELECT id,username, user_detail.image, user_detail.phone_number FROM users JOIN user_detail ON users.id = user_detail.user_id JOIN contacts ON contacts.contact_id = users.id WHERE contacts.user_id = ? AND users.username LIKE '%${query.search}%' UNION SELECT id,username, user_detail.image, user_detail.phone_number FROM users JOIN user_detail ON users.id = user_detail.user_id JOIN contacts ON contacts.user_id = users.id WHERE contacts.contact_id = ? AND users.username LIKE '%${query.search}%' ORDER BY username ASC LIMIT ? OFFSET ?;`;
			db.query(
				getContactList,
				[id, id, Number(query.limit), offset],
				(err, contacts) => {
					if (err) {
						console.error(err);
						reject(err);
					}
					// console.log(contacts);
					resolve(contacts);
				}
			);
		});
	},
	getUserById: (id) => {
		return new Promise((resolve, reject) => {
			const query =
				"SELECT username, email, pin, user_detail.image, user_detail.phone_number, user_detail.num_of_contact,user_detail.balance FROM users JOIN user_detail ON users.id = user_detail.user_id WHERE id=?;";
			db.query(query, [id], (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data[0]);
			});
		});
	},
};

module.exports = userModel;
