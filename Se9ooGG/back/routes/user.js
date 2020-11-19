const express = require('express');
const pool = require('../config/pool');
const queryModule = require('./query/query');
const selectCountIsExUserByEmail = queryModule.selectCountIsExUserByEmail;
const insertUser = queryModule.insertUser;

const router = express.Router();

// 회원가입
router.post('/user/signup', async (req, res, next) => {
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
  
      // 회원가입
      [result] = await connection.execute(insertUser, [email, password, nickname]);
  
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
      if (!connection) {
        connection.release();
      }
    }
});

module.exports = router;