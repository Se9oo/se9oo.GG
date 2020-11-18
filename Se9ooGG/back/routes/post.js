const express = require('express');

const router = express.Router();

router.post('/post', (req, res) => {
  res.json({ message: '호에엥' });
});

module.exports = router;