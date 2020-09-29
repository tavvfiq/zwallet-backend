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
	pagination: function (id, query, res, { contacts }, status) {
		let page = query.page;
		let limit = 0;
		let prevPage = "";
		let nextPage = "";
		if (contacts.length !== 0) {
			page = Number(query.page);
			limit = Number(query.limit);
			prevPage =
				page === 1
					? ""
					: `/user/contact/${id}?search=${query.search}&page=${
							page - 1
					  }&limit=${limit}`;
			contacts.length < limit
				? ""
				: (nextPage = `/user/contact/${id}?search=${
						query.search
				  }&page=${page + 1}&limit=${limit}`);
		}
		const resObj = {
			isSuccess: true,
			isTokenValid: true,
			status: status,
			contacts,
			pageInfo: {
				page,
				prevPage,
				nextPage,
			},
		};
		res.json(resObj);
	},
	paginationTransaction: (id, query, res, { transactions }, status) => {
		let page = query.page;
		let limit = 0;
		let prevPage = "";
		let nextPage = "";
		if (transactions.length !== 0) {
			page = Number(query.page);
			limit = Number(query.limit);
			prevPage =
				page === 1
					? ""
					: `/transaction/${id}?page=${page - 1}&limit=${limit}`;
			transactions.length < limit
				? ""
				: (nextPage = `/transaction/${id}?page=${
						page + 1
				  }&limit=${limit}`);
		}
		const resObj = {
			isSuccess: true,
			isTokenValid: true,
			status: status,
			transactions,
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
