const express = require("express");
const cors = require("cors");
const session = require("express-session");
const logger = require("morgan");

const mainController = require("./controllers");
const port = 3000;
const app = express();

app.use(
	session({
		secret: "@devDiary",
		resave: false,
		saveUninitialized: true,
	}),
);

app.use(
	cors({
		origin: true,
		methods: ["POST"],
		credentials: true,
	}),
);

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: fales }));

app.post("/user/signup", mainController.signUpController);
app.post("/user/checkEmail", mainController.filteremail);
app.post("/user/checkUsername", mainController.filterusername);

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`server listening on ${port}`);
	});
}

app.use("/", (req, res) => {
	res.send("test");
});

module.exports = app;
