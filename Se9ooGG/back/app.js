const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();

app.use(cors({
  origin: '*',
  credentials: false,
}));
// json post 방식
app.use(express.json());
// form submit -> url encoded 방식
app.use(express.urlencoded({ extended: true }));

// 게시글
app.use(postRouter);
// 사용자
app.use(userRouter);

app.listen(3065, () => {
  console.log('se9oo.GG back start');
});