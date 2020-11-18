const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();

// 게시글
app.use(postRouter);
// 사용자
app.use(userRouter);

app.listen(3065, () => {
  console.log('se9oo.GG back start');
});