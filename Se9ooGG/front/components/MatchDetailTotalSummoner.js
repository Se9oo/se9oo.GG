import React from 'react';
import styled from 'styled-components';
import { getChampionNameById, getSpellNameById, getRuneImgUrl } from './JsonUtil';

// KDA 계산
function getKDA(kill, death, assist) {
  return ((kill + assist) / death).toFixed(2);
}

function getListOrder(lane, role) {
  switch (lane) {
    case 'TOP':
      return 0;
    case 'JUNGLE':
      return 1;
    case 'MIDDLE':
      return 2;
    case 'BOTTOM':
      if (role === 'DUO_CARRY') {
        return 3;
      } else {
        return 4;
      }
  }
}

const MatchDetailTotalSummoner = ({ gameInfo }) => {
  // 각 소환사가 선택한 챔피언 고유 id
  const championName = getChampionNameById(gameInfo.championId);
  // list item 순서 (선택 라인에 따라)
  const order = getListOrder(gameInfo.timeline.lane, gameInfo.timeline.role);
  // game 데이터
  const stats = gameInfo.stats;
  // 소환사 spell
  const spell = getSpellNameById(gameInfo.spell1Id, gameInfo.spell2Id);
  // 소환사 rune
  const runeInfo = {
    perkPrimaryStyle: stats.perkPrimaryStyle,
    perk0: stats.perk0,
    perkSubStyle: stats.perkSubStyle,
  }
  // 소환사 rune
  const rune = getRuneImgUrl(runeInfo);

  const kda = getKDA(stats.kills, stats.deaths, stats.assists);
  
  return (
    <SummonerListItem order={order}>
      <ChampionImg>
        <img src={`./img/champion/${championName.eng}.png`} alt="summoner champion image" />
        <Level>{stats.champLevel}</Level>
      </ChampionImg>
      <Spell>
        <img src={`./img/spell/${spell[0].eng}.png`} alt="summoner-first-spell"/>
        <img src={`./img/spell/${spell[1].eng}.png`} alt="summoner-second-spell"/>
      </Spell>
      <Rune>
        <img src={`./img/${rune.perk0}`} alt="summoner-primary-rune"/>
        <img src={`./img/${rune.subPerk}`} alt="summoner-sub-rune"/>
      </Rune>
      <Info>
        <span>{gameInfo.summonerName}</span>
        <Stats>
          <span>{`${stats.kills}/${stats.deaths}/${stats.assists}`}</span>
          <span>{`${kda} : 1`}</span>
        </Stats>
      </Info>
    </SummonerListItem>
  );
};

export default MatchDetailTotalSummoner;

const SummonerListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1% 3% 3% 3%;
  order: ${props => props.order};
`;

const ChampionImg = styled.div`
  position: relative;
  width: 12%;
  margin-right: 1%;

  & img {
    width: 100%;
    border-radius: 999px;
  }
`;

const Level = styled.span`
  position: absolute;
  bottom: -10%;
  left: -10%;
  padding: 5%;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, .5);
  color: #ffffff;
`;

const Spell = styled.div`
  width: 7.5%;

  & img {
    width: 100%;
    margin: 10%;
    border-radius: 20%;
  }
`;

const Rune = styled.div`
  width: 7.5%;
  margin-right: 3%;

  & img {
    width: 100%;
    margin: 10%;
    padding: 10%;
    background-color: #000000;
    border-radius: 999px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`;