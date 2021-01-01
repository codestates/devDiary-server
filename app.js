const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const diaryRouter = require('./routes/diary');
const questionRouter = require('./routes/question');
const userRouter = require('./routes/user');

const port = 4000;
const app=express();

app.use(bodyParser.json());

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
		methods: ["GET","POST"],
		credentials: true,
	}),
);

app.use(express.json());
// app.use(express.urlencoded({ extended: fales }));

app.use('/user', userRouter);
app.use('/diary', diaryRouter);
app.use('/question', questionRouter);

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`server listening on ${port}`);
	});
}

module.exports = app;
