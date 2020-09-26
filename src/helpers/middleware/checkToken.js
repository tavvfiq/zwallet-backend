const responseForm = require("../form/responseForm");
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
	const bearerToken = req.header("x-access-token");
	try {
		const token = bearerToken.split(" ")[1];
		jwt.verify(token, process.env.SECRET_KEY, (err) => {
			if (err) {
				throw err;
			}
			next();
		});
	} catch (e) {
		responseForm.tokenInvalid(res, e);
	}
};

module.exports = checkToken;
