const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');
const path = require('path');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const statisticRouter = require('./routes/statistic');
const championRouter = require('./routes/champion');

const app = express();

dotenv.config();
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: ['http://se9oogg.com', 'http://www.se9oogg.com'],
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
}

// json post 방식
app.use(express.json());
// form submit -> url encoded 방식
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.se9oogg.com',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, 'uploads')));

// 게시글
app.use(postRouter);
// 사용자
app.use(userRouter);
// 전적
app.use(statisticRouter);
// 챔피언 한줄평
app.use(championRouter);

const port = process.env.NODE_ENV === 'production' ? 80 : 3060;
app.listen(port, () => {
  console.log(`se9oo.GG ${port === 80 ? 'prod' : 'dev'} back start`);
});
