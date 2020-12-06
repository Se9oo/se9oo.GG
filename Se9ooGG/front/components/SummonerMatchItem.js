import React from 'react';
import { useSelector } from 'react-redux';
import { SummonerChampion, SummonerMatchListItem, SummonerSpell } from '../styles/components/Components';
import { getChampionNameById, getSpellNameById } from './JsonUtil';

const SummonerMatchItem = ({ match }) => {
  // 소환사 이름
  const summonerName = useSelector((state) => (state.statistic.summoner.summonerName));
  // 소환사 id
  const summonerId = match.participantIdentities.map((summoner) => {
    if (summoner.player.summonerName === summonerName) {
      return summoner.participantId;
    }
  });
  // 소환사 id로 찾은 소환사의 게임 정보
  const [summonerInfo] = match.participants.filter((info) => info.participantId === parseInt(summonerId, 10));
  // 소환사 챔피언 이름
  const championName = getChampionNameById(summonerInfo.championId);
  // 소환사 spell
  const summonerSpell = getSpellNameById(summonerInfo.spell1Id, summonerInfo.spell2Id);
  
  return (
    <SummonerMatchListItem>
      <SummonerChampion>
        <img src={`./img/champion/${championName.eng}.png`} alt="summoner-champion-image"/>
        <span>{championName.kor}</span>
      </SummonerChampion>
      <SummonerSpell>
        <img src={`./img/spell/${summonerSpell[0].eng}.png`} alt="summoner-first-spell"/>
        <img src={`./img/spell/${summonerSpell[1].eng}.png`} alt="summoner-second-spell"/>
      </SummonerSpell>
    </SummonerMatchListItem>
  )
};

export default SummonerMatchItem;