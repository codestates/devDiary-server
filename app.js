const express = require("express");
const cors = require("cors");
const session = require("express-session");
const usersRouter = require("./routes/user")
// const logger = require("morgan");

// const mainController = require("./controllers/userController");
const port = 4000;
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
		methods: ["GET"],
		credentials: true,
	}),
);

// app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: fales }));

// app.post("/user/login", mainController.login);
app.use("/user", usersRouter)

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`server listening on ${port}`);
	});
}

app.use("/", (req, res) => {
	res.send("test");
});

module.exports = app;
