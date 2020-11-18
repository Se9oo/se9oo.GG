const express = require('express');
const mysql = require('mysql');
const config = require('../config/config.json');
const conn = mysql.createConnection(config);

const router = express.Router();

// example
router.get('/user', (req, res) => {
  conn.query('SELECT * FROM user', (error, rows) => {
    if (error) throw error;
    console.log('query result : ', rows);
    res.json({ data: rows });
  });
});

// 회원가입
router.post('/user/signup', (req, res, next) => {
  try {
    const selectIsExUser = `SELECT COUNT(*) AS cnt FROM user where ${req.body.email}`;
    const isExUser = conn.query(selectIsExUser, (err, rows) => {
      return rows[0].cnt;
    });

    if (isExUser > 0) {
      return res.status(403).send('이미 사용중인 email 입니다.');
    }

    const insertUser = `
      INSERT INTO user (user_email, user_password, user_nickname, reg_dt)
      VALUES (${req.body.email}, ${req.body.password}, ${req.body.user_nickname})
    `;
    conn.query(insertUser, (err, rows) => {
      console.log("record inserted");
    });

    res.status(200).send('signup success');
  } catch (err) {
    console.err(error);
    next(error);
  };
});

module.exports = router;