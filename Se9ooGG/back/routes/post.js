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
  selectMaxPostId,
  selectMyPostCount,
  selectLikeCountByPostId,
  selectIsLike,
  addLike,
} = require('./query/post');

const router = express.Router();

// 모든 게시글 조회
router.get('/post/posts', async (req, res, next) => {
  let lastPostId = parseInt(req.query.lastPostId, 10);
  const LOAD_MAX_POSTS_COUNT = 4;
  const connection = await pool.getConnection();

  try {
    if (lastPostId === 0) {
      const [result] = await connection.query(selectMaxPostId);
      lastPostId = result[0].maxPostId + 1;
    }

    // 모든 게시글 조회
    const [postList] = await connection.query(selectPostList, [lastPostId, LOAD_MAX_POSTS_COUNT]);

    // 조회한 게시글 id로 해당 게시글의 댓글 조회
    await Promise.all(
      postList.map(async (row, i) => {
        const [commentList] = await connection.query(selectCommentInfoByPostId, [row.postId]);
        const [likeCount] = await connection.query(selectLikeCountByPostId, [row.postId]);

        postList[i].comments = commentList; // 댓글 목록
        postList[i].likeCount = likeCount[0].cnt; // 좋아요 개수
        postList[i].isLike = false;

        if (req.user) {
          const [isLike] = await connection.query(selectIsLike, req.user[0].email);

          postList[i].isLike = isLike[0].cnt > 0 ? true : false; // 좋아요 여부
        }
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

router.get(`/post/myposts/:page`, isLoggedIn, async (req, res, next) => {
  const { email } = req.user[0];
  const { page } = req.params;

  const connection = await pool.getConnection();

  // 한 페이지에 보여줄 게시글 갯수
  const MAX_PAGE_ITEM_COUNT = 5;

  try {
    if (!email) {
      return res.status(401).json('입력값을 확인해주세요.');
    }

    const [myPostCount] = await connection.query(selectMyPostCount, [email]);

    // 예외처리
    if (page <= 0) {
      page = 1;
    }

    // offset 설정
    let offset = page ? MAX_PAGE_ITEM_COUNT * page - MAX_PAGE_ITEM_COUNT : 0;

    const [myPostList] = await connection.query(selectMyPostList, [email, MAX_PAGE_ITEM_COUNT, offset]);

    // 조회한 게시글 id로 해당 게시글의 댓글 조회
    await Promise.all(
      myPostList.map(async (row, i) => {
        const [commentList] = await connection.query(selectCommentInfoByPostId, [row.postId]);
        myPostList[i].comments = commentList;
      })
    );

    const data = {};
    data['myPostCount'] = myPostCount[0]['count'];
    data['myPostList'] = myPostList;

    return res.status(200).json(data);
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
  const { title, content } = req.body;
  const { email, nickname } = req.user[0];

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (email && title && content) {
      const [result] = await connection.execute(insertPost, [title, content, email]);

      await connection.commit();

      const data = {
        postId: result.insertId,
        title,
        content,
        email,
        nickname,
        comments: [],
      };
      return res.status(200).json(data);
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
  const { content, postId } = req.body;
  const { email } = req.user[0];

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

// 특정 게시글 댓글 조회
router.get(`/post/comments`, async (req, res, next) => {
  const postId = parseInt(req.query.postId, 10);
  const connection = await pool.getConnection();

  try {
    if (!postId) {
      return res.status(401).json('error');
    }

    const [commentList] = await connection.query(selectCommentInfoByPostId, [postId]);

    return res.status(200).json(commentList);
  } catch (err) {
    next(err);
    return res.status(500).json(err);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

// 게시글 좋아요 등록
router.post(`/post/like/:postId`, isLoggedIn, async (req, res, next) => {
  const { postId } = req.params;
  const { email } = req.user[0];

  const connection = await pool.getConnection();

  try {
    if (!postId) return res.status(401).json('error');

    await connection.beginTransaction();

    await connection.execute(addLike, [postId, email]);

    await connection.commit();

    return res.status(200);
  } catch (err) {
    next(err);
    return res.status(500).json;
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

module.exports = router;
