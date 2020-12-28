const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");

const diaryRouter = require('./routes/diary');
// const userRouter = require('./routes/user');

const app=express();

app.use(cors());
app.use(bodyParser.json());

// app.use('/user', usersRouter);
app.use('/diary', diaryRouter);

app.listen(3000, ()=>{
    console.log('server on 3000');
});
