const responseForm = {
	success: function (res, data, status) {
		const responseObj = {
			isSuccess: true,
			status: status,
			data,
		};
		res.json(responseObj);
	},
	menuResponse: function (res, menu, status) {
		const responseObj = {
			isSuccess: true,
			status: status,
			menu,
		};
		res.json(responseObj);
	},
	error: function (res, err, status) {
		const responseObj = {
			isSuccess: false,
			status: status,
			data: err,
		};
		res.json(responseObj);
	},
};

module.exports = responseForm;
