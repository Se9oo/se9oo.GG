const express = require('express');
const pool = require('../config/pool');
const bcrypt = require('bcrypt');
const passport = require('passport');
const queryModule = require('./query/user');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');
const selectCountIsExUserByEmail = queryModule.selectCountIsExUserByEmail;
const insertUser = queryModule.insertUser;

const router = express.Router();

// 로그인
router.post('/user/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.err(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      return res.json(user);
    });
  }) (req, res, next);
});

// 로그아웃
router.post('/user/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logout success');
});

// 회원가입
router.post('/user/signup', isNotLoggedIn, async (req, res, next) => {
  // 회원가입 이메일
  const { email, password, nickname } = req.body;
  console.log(`[parameter] : ${JSON.stringify(req.body)}`);
  
    // connection pool;
    const connection = await pool.getConnection();

    try {
      // transaction
      await connection.beginTransaction();
      
      // 이메일 중복 체크
      let [result] = await connection.query(selectCountIsExUserByEmail, [email]);
      
      // 중복
      if (result[0].cnt > 0) {
        return res.status(403).json('존재하는 회원 email 입니다.');
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      // 회원가입
      [result] = await connection.execute(insertUser, [email, hashedPassword, nickname]);
  
      // commit
      await connection.commit();

      // success
      return res.status(200).json('insert success');

    } catch (err) {
      // rollback
      await connection.rollback();
      next(err);
      return res.status(500).json(err);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
});

module.exports = router;