const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const diaryController = require("./controllers/diaryController");

// const usersRouter = require('./routes/users');
// const diaryRouter = require('./routes/diaries');

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.post('/diary/newPost', diaryController.newPost);
// app.use('/user', usersRouter);
// app.use('/diary', diaryRouter);

app.listen(3000, ()=>{
    console.log('server on 3000');
});
