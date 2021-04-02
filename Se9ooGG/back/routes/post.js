const express = require('express');
const pool = require('../config/pool');
const { isLoggedIn } = require('./middlewares');
const {
  insertPost,
  selectPostList,
  selectMyPostList,
  selectCommentInfoByPostId,
  insertComment,
  deleteComment,
  deletePost,
  selectCommentInfoByCommentId,
} = require('./query/post');

const router = express.Router();

// 모든 게시글 조회
router.get('/post/posts', async (req, res, next) => {
  const connection = await pool.getConnection();

  try {
    // 모든 게시글 조회
    const [postList] = await connection.query(selectPostList);

    // 조회한 게시글 id로 해당 게시글의 댓글 조회
    await Promise.all(
      postList.map(async (row, i) => {
        const [commentList] = await connection.query(selectCommentInfoByPostId, [row.postId]);
        postList[i].comments = commentList;
      })
    );

    if (postList) {
      return res.status(200).json(postList);
    }
  } catch (err) {
    next(err);
    return res.status(500).json(err);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

router.get(`/post/myposts/:userEmail`, isLoggedIn, async (req, res, next) => {
  const { userEmail } = req.params;

  const connection = await pool.getConnection();

  try {
    if (!userEmail) {
      return res.status(401).json('입력값을 확인해주세요.');
    }

    const [myPostList] = await connection.query(selectMyPostList, [userEmail]);

    // 조회한 게시글 id로 해당 게시글의 댓글 조회
    await Promise.all(
      myPostList.map(async (row, i) => {
        const [commentList] = await connection.query(selectCommentInfoByPostId, [row.postId]);
        myPostList[i].comments = commentList;
      })
    );

    return res.status(200).json(myPostList);
  } catch (err) {
    next(err);
    return res.status(500).json(err);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

// 게시글 등록
router.post('/post/post', isLoggedIn, async (req, res, next) => {
  const { email, title, content } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (email && title && content) {
      const [result] = await connection.execute(insertPost, [title, content, email]);

      await connection.commit();

      return res.status(200).json(result.insertId);
    } else {
      return res.status(401).json('입력값을 확인해주세요.');
    }
  } catch (err) {
    await connection.rollback();
    next(err);
    return res.status(500).json(err);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

// 게시글 삭제
router.delete('/post/post/:postId', isLoggedIn, async (req, res, next) => {
  const { postId } = req.params;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (postId) {
      // 게시글을 지우면 cascade로 댓글도 다 삭제됨
      await connection.execute(deletePost, [postId]);

      await connection.commit();

      return res.status(200).json('deletePost Success');
    } else {
      return res.status(401).json('에러');
    }
  } catch (err) {
    await connection.rollback();
    next(err);
    return res.status(500).json(err);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

// 댓글 등록
router.post('/post/:postId/comment', isLoggedIn, async (req, res, next) => {
  const { email, content, postId } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (email && content && postId) {
      const [insert] = await connection.execute(insertComment, [email, content, postId]);

      await connection.commit();

      const commentId = insert.insertId;

      const [comment] = await connection.query(selectCommentInfoByCommentId, [commentId]);
      comment[0].postId = parseInt(postId);

      return res.status(200).json(comment);
    } else {
      return res.status(401).json('입력값을 확인해주세요.');
    }
  } catch (err) {
    await connection.rollback();
    next(err);
    return res.status(500).json(err);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

// 댓글 삭제
router.delete('/post/:postId/comment/:commentId', isLoggedIn, async (req, res, next) => {
  const { commentId } = req.params;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (commentId) {
      await connection.execute(deleteComment, [commentId]);

      await connection.commit();

      return res.status(200).json('deleteComment Success');
    } else {
      return res.status(401).json('에러');
    }
  } catch (err) {
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
