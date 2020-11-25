const express = require('express');
const pool = require('../config/pool');
const { insertPost, selectPostList, selectCommentInfoByPostId, insertComment } = require('./query/post');

const router = express.Router();

// 모든 게시글 조회
router.get('/post/loadPost', async (req, res, next) => {
  const connection = await pool.getConnection();

  try {
    // 모든 게시글 조회
    const [postList] = await connection.query(selectPostList);
    
    // 조회한 게시글 id로 해당 게시글의 댓글 조회
    await Promise.all(postList.map( async (row, i) => {
      const [commentList] = await connection.query(selectCommentInfoByPostId, [row.postId]);
      postList[i].comments = commentList;
    }));

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

// 게시글 등록
router.post('/post/addPost', async (req, res, next) => {
  const { user, title, content } = req.body;
  console.log(`[parameter] : ${JSON.stringify(req.body)}`);

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (user.email && title && content) {
      await connection.execute(insertPost, [title, content, user.email]);
    } else {
      return res.status(401).json('입력값을 확인해주세요.');
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

// 댓글 등록
router.post('/post/:postId/addComment', async (req, res, next) => {
  const { email, content, postId } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (email && content && postId) {
      await connection.execute(insertComment, [email, content, postId]);

      await connection.commit();

      return res.status(200).json('addComment Success');
    } else {
      return res.status(401).json('입력값을 확인해주세요.');
    }
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