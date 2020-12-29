const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const diaryRouter = require('./routes/diary');
const userRouter = require('./routes/user');

const port = 4000;
const app=express();

// app.use(cors());
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
		origin: "http://practice-react-ref-deploy.s3-website.ap-northeast-2.amazonaws.com",
		methods: ["GET","POST"],
		credentials: true,
	}),
);

app.use(express.json());

app.use('/user', userRouter);
app.use('/diary', diaryRouter);

if (process.env.NODE_ENV !== "test") {
	app.listen(port, () => {
		console.log(`server listening on ${port}`);
	});
}

