require("dotenv").config();

const { express, http, io } = require("./sharedVariable");
const bodyParser = require("body-parser");
const logger = require("morgan");
const indexRouter = require("./src/routes/index.route");
const socketListener = require("./src/handler/socketHandler");

const cors = require("cors");

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Server is running at :${process.env.PORT}`);
});

http.listen(process.env.SOCKET_PORT, () => {
	console.log(`socket listening at :${process.env.SOCKET_PORT}`);
});

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(cors());

app.use(indexRouter);

socketListener(io);
