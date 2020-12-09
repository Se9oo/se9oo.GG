import React from 'react';
import { useSelector } from 'react-redux';
import { getChampionNameById, getRuneImgUrl, getSpellNameById } from './JsonUtil';
import { 
  SummonerChampion, SummonerKDARate, SummonerMatchListItem, 
  SummonerRune, SummonerScore, SummonerSpell, 
  SummonerKDA, SummonerStats, SummonerInfo, SummonerItems, SummonerWinOrLose, SummonerStatInfo, SummonerMatch, SummonerText 
} from '../styles/components/Components';

function getKDA(kill, death, assist) {
  return ((kill + assist) / death).toFixed(2);
}

const SummonerMatchItem = ({ match }) => {
  // 소환사 이름
  const summonerName = useSelector((state) => (state.statistic.summoner.summonerName));
  // 소환사 id
  const findSummoner = match.participantIdentities.find((summoner) => {
    return summoner.player.summonerName.toLowerCase() === summonerName.toLowerCase();
  });
  // 소환사 id로 찾은 소환사의 게임 정보
  const summonerInfo = match.participants.find((info) => info.participantId === parseInt(findSummoner.participantId, 10));
  // 소환사 게임 stat
  const summonerStats = summonerInfo.stats;
  // 소환사 챔피언 이름
  const championName = getChampionNameById(summonerInfo.championId);
  // 소환사 spell
  const summonerSpell = getSpellNameById(summonerInfo.spell1Id, summonerInfo.spell2Id);
  // 소환사 rune
  const runeInfo = {
    perkPrimaryStyle: summonerStats.perkPrimaryStyle,
    perk0: summonerStats.perk0,
    perkSubStyle: summonerStats.perkSubStyle,
  }
  // 소환사 rune img 경로
  const summonerRune = getRuneImgUrl(runeInfo);
  // 소환사 KDA
  const summonerKDA = getKDA(summonerStats.kills, summonerStats.deaths, summonerStats.assists);
  // 소환사 item
  const summonerItemsArr = [];
  for (let i = 0; i < 7; i++) {
    summonerItemsArr.push(summonerStats[`item${i}`]);
  }
  return (
    <SummonerMatchListItem>
      <SummonerWinOrLose winOrLose={summonerStats.win}>
        <span>{summonerStats.win ? '승' : '패'}</span>
      </SummonerWinOrLose>
      <SummonerInfo>
        <SummonerStatInfo>
          <SummonerChampion>
            <img src={`./img/champion/${championName.eng}.png`} alt="summoner-champion-image"/>
          </SummonerChampion>
          <SummonerSpell>
            <img src={`./img/spell/${summonerSpell[0].eng}.png`} alt="summoner-first-spell"/>
            <img src={`./img/spell/${summonerSpell[1].eng}.png`} alt="summoner-second-spell"/>
          </SummonerSpell>
          <SummonerRune>
            <img src={`./img/${summonerRune.perk0}`} alt="summoner-primary-rune"/>
            <img src={`./img/${summonerRune.subPerk}`} alt="summoner-sub-rune"/>
          </SummonerRune>
          <SummonerText>
            <SummonerKDA>
              <SummonerScore>
                <span>{summonerStats.kills}</span>
                <span>{summonerStats.deaths}</span>
                <span>{summonerStats.assists}</span>
              </SummonerScore>
              <SummonerKDARate>
                {`${summonerKDA} : 1`}
              </SummonerKDARate>
            </SummonerKDA>
            <SummonerStats>
              <span>{`레벨 ${summonerStats.champLevel}`}</span>
              <span>{`${summonerStats.totalMinionsKilled} CS`}</span>
            </SummonerStats>
            <SummonerMatch>
              <span>솔랭</span>
              <span>{`${parseInt(match.gameDuration / 60)}:${match.gameDuration % 60}`}</span>
            </SummonerMatch>
          </SummonerText>
        </SummonerStatInfo>
        <SummonerItems>
          {
            summonerItemsArr.map((v) => {
              return v == 0 ? <div></div> : <img src={`/img/item/${v}.png`} alt="summoner-item" />
            })
          }
        </SummonerItems>
      </SummonerInfo>
    </SummonerMatchListItem>
  )
};

export default SummonerMatchItem;