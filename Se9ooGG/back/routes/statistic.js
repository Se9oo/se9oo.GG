const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config();

router.post('/statistic/loadSummoner', (req, res, next) => {
  const { summonerName } = req.body;
  
  if (summonerName) {
    axios.get(encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`))
    .then((response) => {
      return res.status(200).json([response.data][0].accountId);
    })
    .catch(function (err) {
      console.log(err);
    });
  } else {
    return res.status(401).json('error');
  }
});

router.post('/statistic/loadSummonerInfo', (req, res, next) => {
  const { accountId } = req.body;

  return res.status(200).json('success');
});

module.exports = router;