const express = require('express');
const pool = require('../config/pool');
const { isLoggedIn } = require('./middlewares');
const {
  selectChampionComments,
  selectTotalChampionCommentsCount,
  insertChampionComment,
  cancelChampionComment,
} = require('./query/champion');

const router = express.Router();

// 챔피언 한줄평 등록
router.post('/champion/comment', isLoggedIn, async (req, res, next) => {
  const { championName, content, userEmail } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (championName && content) {
      const [result] = await connection.execute(insertChampionComment, [championName, content, userEmail]);

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

// 챔피언 한줄평 취소
router.put('/champion/comment', isLoggedIn, async (req, res, next) => {
  const { commentId } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (commentId) {
      const [result] = await connection.execute(cancelChampionComment, [commentId]);

      await connection.commit();

      return res.status(200).json(result.commentId);
    } else {
      return res.status(401).json('댓글을 찾을 수 없습니다. 다시 시도해 주세요.');
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

// 챔피언 한줄평 조회
router.get('/champion/comments/:championName/:page', async (req, res, next) => {
  const { championName, page } = req.params;

  const connection = await pool.getConnection();
  // 한 페이지에 보여줄 한줄평 갯수
  const MAX_PAGE_ITEM_COUNT = 3;

  try {
    // 챔피언 댓글 조회
    if (championName) {
      const [championCommentsListCount] = await connection.query(selectTotalChampionCommentsCount, [championName]);

      // 챔피언 한줄평 없을 경우 null return
      if (championCommentsListCount.length === 0) {
        res.status(200).json(null);
      }

      // 예외처리
      if (page <= 0) {
        page = 1;
      }

      // offset 설정
      let offset = page ? MAX_PAGE_ITEM_COUNT * page - MAX_PAGE_ITEM_COUNT : 0;

      // 한줄평 목록 조회
      const [championCommentsList] = await connection.query(selectChampionComments, [
        championName,
        MAX_PAGE_ITEM_COUNT,
        offset,
      ]);

      // 총 데이터 수
      const totalCommentsCount = championCommentsListCount[0]['count'];
      // 최종 데이터
      const data = {};
      data['championCommentsList'] = championCommentsList;
      data['totalCommentsCount'] = totalCommentsCount;

      return res.status(200).json(data);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  } finally {
    if (connection !== null) {
      connection.release();
    }
  }
});

module.exports = router;
