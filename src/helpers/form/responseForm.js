const responseForm = {
	success: function (res, data, status) {
		const responseObj = {
			isSuccess: true,
			isTokenValid: true,
			status: status,
			data,
		};
		res.json(responseObj);
	},
	error: function (res, err, status) {
		const responseObj = {
			isSuccess: false,
			isTokenValid: true,
			status: status,
			data: err,
		};
		res.json(responseObj);
	},
	tokenInvalid: function (res, err) {
		const responseObj = {
			isSuccess: false,
			isTokenValid: false,
			msg: err,
		};
		res.json(responseObj);
	},
	pagination: function (id, query, res, { contact }, status) {
		let page = query.page;
		let limit = 0;
		let prevPage = "";
		let nextPage = "";
		if (contact.length !== 0) {
			page = Number(query.page);
			limit = Number(query.limit);
			prevPage =
				page === 1
					? ""
					: `/user/${id}?search=${query.search}&page=${
							page - 1
					  }&limit=${limit}`;
			contact.length < limit
				? ""
				: (nextPage = `/user/${id}?search=${query.search}&page=${
						page + 1
				  }&limit=${limit}`);
		}
		const resObj = {
			isSuccess: true,
			status: status,
			contact,
			pageInfo: {
				page,
				prevPage,
				nextPage,
			},
		};
		res.json(resObj);
	},
};

module.exports = responseForm;
