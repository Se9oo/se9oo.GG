const express = require('express');
const pool = require('../config/pool');
const { selectChampionComments } = require('./query/champion');

const router = express.Router();

router.get('/champion/comments/:championName', async (req, res, next) => {
  const { championName } = req.params;

  const connection = await pool.getConnection();

  try {
    // 챔피언 댓글 조회
    if (championName) {
      const [championCommentsList] = await connection.query(selectChampionComments, [championName]);

      return res.status(200).json(championCommentsList);
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
