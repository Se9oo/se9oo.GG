const express = require('express');
const pool = require('../config/pool');
const { insertPost, selectPostList } = require('./query/query');

const router = express.Router();

router.get('/post/loadPost', async (req, res, next) => {
  const connection = await pool.getConnection();

  try {
    const [postList] = await connection.query(selectPostList);
    console.log(`postList: ${JSON.stringify(postList)}`);
    if (postList) {
      return res.status(200).json(postList);
    }

  } catch (err) {
    next(err);
    return res.status(500).json(err);
  } finally {
    if (!connection) {
      connection.release();
    }
  }
});

router.post('/post/addPost', async (req, res, next) => {
  const { user, title, content } = req.body;
  console.log(`[parameter] : ${JSON.stringify(req.body)}`);

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (user.email && title && content) {
      const [result] = await connection.execute(insertPost, [title, content, user.email]);
      console.log(`result : ${JSON.stringify(result)}`);
      //result : {"fieldCount":0,"affectedRows":1,"insertId":2,"info":"","serverStatus":3,"warningStatus":0}
    }

    await connection.commit();
    
    return res.status(200).json('addPost Success');
  } catch (err) {
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