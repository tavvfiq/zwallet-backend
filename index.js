require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const indexRouter = require("./src/routes/index.route");

const cors = require("cors");

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server is running at :${process.env.PORT}`);
});

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(cors());

app.use(indexRouter);
