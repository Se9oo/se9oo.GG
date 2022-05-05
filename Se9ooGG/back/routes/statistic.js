const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config();

router.get('/statistic/loadSummoner', async (req, res, next) => {
  const { summonerName } = req.query;

  try {
    if (summonerName) {
      // 소환사 이름으로 정보 찾기
      const summonerBaseInfo = await axios.get(
        encodeURI(
          `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`
        )
      );

      const { id, profileIconId, summonerLevel, accountId, name, puuid } = summonerBaseInfo.data;

      if (!summonerBaseInfo) {
        return res.status(401).json('사용자 정보를 확인해주세요.');
      }

      // 소환사 tier 정보
      const tierInfo = await axios.get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`
      );
      const tier = tierInfo.data;

      tier.map((v) => {
        if (v.queueType === 'RANKED_SOLO_5x5') {
          v.sort = 0;
          v.queueType = '솔로랭크';
        } else {
          v.sort = 1;
          v.queueType = '자유랭크';
        }

        delete v.leagueId, delete v.summonerId, delete v.summonerName;
      });

      // 소환사 숙련도 top3 챔피언 정보
      const proficiencyLevelInfo = await axios.get(
        `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process.env.API_KEY}`
      );
      const proficiencyTop3Info = proficiencyLevelInfo.data.slice(0, 3);

      // delete summonerId
      proficiencyTop3Info.map((v) => delete v.summonerId);

      // match 정보
      const allMatchesInfo = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.API_KEY}`
      );

      const matchData = await Promise.all(
        allMatchesInfo.data.map(async (match) => {
          const matchInfo = await axios.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${process.env.API_KEY}`
          );
          // timeLines 정보
          const matchTimeLines = await axios.get(
            `https://asia.api.riotgames.com/lol/match/v5/matches/${match}/timeline?api_key=${process.env.API_KEY}`
          );
          // matchInfo에 timeLines data 추가
          matchInfo.data.matchTimelines = matchTimeLines.data;

          return matchInfo.data;
        })
      );

      const summonerData = {
        profileIconId,
        id,
        accountId,
        summonerName: name,
        summonerLevel,
        tier,
        proficiencyTop3: proficiencyTop3Info,
        match: matchData,
      };

      return res.status(200).json(summonerData);
    } else {
      return res.status(401).json('사용자 정보를 확인해주세요.');
    }
  } catch (err) {
    console.error(err.response.data);
    res.status(err.response.data.status.status_code).json(err.response.data.status.message);
    //next(JSON.stringify(err.response.data));
  }
});

// 사용자 인게임 정보 가져오기
router.get('/statistic/loadSummonerInGame/:summonerName', async (req, res, next) => {
  const { summonerName } = req.params;

  try {
    if (summonerName) {
      const summonerBaseInfo = await axios.get(
        encodeURI(
          `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`
        )
      );
      const { id } = summonerBaseInfo.data;

      const InGameInfo = await axios.get(
        encodeURI(
          `https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${process.env.API_KEY}`
        )
      );

      return res.status(200).json(InGameInfo.data);
    } else {
      return res.status(401).json('사용자 정보를 확인해주세요.');
    }
  } catch (err) {
    console.error(err.response.data);
    res.status(err.response.data.status.status_code).json(err.response.data.status.message);
  }
});

module.exports = router;
