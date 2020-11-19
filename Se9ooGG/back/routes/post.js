const express = require('express');
const pool = require('../config/pool');

const router = express.Router();

router.post('/post/test', async (req, res, next) => {
  try {
    const data = await pool.query('select * from user');
    return res.json(data[0]);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;