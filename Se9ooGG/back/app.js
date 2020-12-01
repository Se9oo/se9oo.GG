const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const statisticRouter = require('./routes/statistic');

const app = express();

dotenv.config();
passportConfig();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
// json post 방식
app.use(express.json());
// form submit -> url encoded 방식
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}))
app.use(passport.initialize());
app.use(passport.session());

// 게시글
app.use(postRouter);
// 사용자
app.use(userRouter);
// 전적
app.use(statisticRouter);

app.listen(3065, () => {
  console.log('se9oo.GG back start');
});