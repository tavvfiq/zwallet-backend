const formResponse = require("../helpers/form/responseForm");
const userModel = require("../models/user.model");

const userController = {
	updateUser: (req, res) => {
		userModel
			.updateUser(req.params.id, req.body)
			.then((data) => {
				formResponse.success(res, data, 200);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
	addContact: (req, res) => {
		userModel
			.addContact(req.body)
			.then((data) => {
				formResponse.success(res, data, 200);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
	getContactList: (req, res) => {
		userModel
			.getContactList(req.params.id, req.query)
			.then((contacts) => {
				formResponse.pagination(
					req.params.id,
					req.query,
					res,
					{ contacts },
					200
				);
			})
			.catch((err) => {
				console.log(err);
				formResponse.error(res, err, 500);
			});
	},
	getUserById: (req, res) => {
		userModel
			.getUserById(req.params.id)
			.then((data) => {
				formResponse.success(res, data, 200);
			})
			.catch((err) => {
				formResponse.error(res, err, 500);
			});
	},
};

module.exports = userController;
