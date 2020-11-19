const express = require('express');
const pool = require('../config/pool');
const queryModule = require('./query/query');
const selectCountIsExUserByEmail = queryModule.selectCountIsExUserByEmail;
const insertUser = queryModule.insertUser;

const router = express.Router();

// 회원가입
router.post('/user/signup', async (req, res, next) => {
  // 회원가입 이메일
  const { user_email, user_password, user_nickname } = req.body;
  console.log(`[parameter] : ${JSON.stringify(req.body)}`);
  
  // connection
  const conn = pool.getConnection((err, con));

  try {
    (await conn).beginTransaction();
    // 이메일 중복 체크
    
    let [result] = (await conn).execute(selectCountIsExUserByEmail, [user_email]);

    if (result[0].cnt > 0) {
      return res.status(403).json('존재하는 회원 email 입니다.');
    }

    [result] = (await conn).execute(insertUser, [user_email, user_password, user_nickname]);
    console.log(result.affectedRows);

    // commit
    (await conn).commit();

  } catch (err) {
    // rollback
    (await conn).rollback();
    next(err);
    return res.status(500).json(err);
  } finally {
    if (!conn) {
      (await conn).release();
    }
  }
});

module.exports = router;