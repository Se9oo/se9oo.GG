const express = require('express');
const pool = require('../config/pool');
const { selectChampionComments, selectTotalChampionCommentsCount } = require('./query/champion');

const router = express.Router();

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
