const mySQL = require("mysql");

// console.log(typeofprocess.env.HOST);

const db = mySQL.createConnection({
	host: process.env.HOST,
	user: process.env.USERNAME,
	database: process.env.DB,
	password: process.env.PASSWORD,
	multipleStatements: true,
});

db.connect((err) => {
	if (err) throw err;
	console.log("Database Connected!");
});

module.exports = db;
