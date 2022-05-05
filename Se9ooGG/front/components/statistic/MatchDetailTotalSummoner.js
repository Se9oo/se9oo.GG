import React, { useCallback } from 'react';
import styled from 'styled-components';
import { getKDA, getListOrder } from '../../util/util';
import { getChampionNameById, getSpellNameById, getRuneImgUrl } from '../../util/JsonUtil';

const MatchDetailTotalSummoner = ({ gameInfo }) => {
  // 각 소환사가 선택한 챔피언 고유 id
  const championName = getChampionNameById(gameInfo.championId);
  // list item 순서 (선택 라인에 따라)
  const order = getListOrder(gameInfo.lane, gameInfo.role);
  // 소환사 spell
  const spell = getSpellNameById(gameInfo.summoner1Id, gameInfo.summoner2Id);
  // 소환사 rune
  const runeInfo = {};
  gameInfo.perks.styles.map((perk) => {
    if (perk.description === 'primaryStyle') {
      runeInfo.perkPrimaryStyle = perk.style;
      runeInfo.perk0 = perk.selections[0].perk;
    } else if (perk.description === 'subStyle') {
      runeInfo.perkSubStyle = perk.style;
    }
  });
  // 소환사 rune
  const rune = getRuneImgUrl(runeInfo);
  // 소환사 kda
  const kda = getKDA(gameInfo.kills, gameInfo.deaths, gameInfo.assists);
  // 소환사 items
  const summonerItemsArr = [];
  for (let i = 0; i < 7; i++) {
    summonerItemsArr.push(gameInfo[`item${i}`]);
  }
  // item error alt img
  const onErrorItemImg = useCallback((e) => {
    e.target.src = '/img/item/0.png';
  }, []);

  return (
    <SummonerListItem order={order}>
      <ChampionImg>
        <img src={`./img/champion/${championName.eng}.png`} alt="summoner champion image" />
        <Level>{gameInfo.champLevel}</Level>
      </ChampionImg>
      <Spell>
        <img src={`./img/spell/${spell[0].eng}.png`} alt="summoner-first-spell" />
        <img src={`./img/spell/${spell[1].eng}.png`} alt="summoner-second-spell" />
      </Spell>
      <Rune>
        <img src={`./img/${rune.perk0}`} alt="summoner-primary-rune" />
        <img src={`./img/${rune.subPerk}`} alt="summoner-sub-rune" />
      </Rune>
      <Info>
        <Nickname>{gameInfo.summonerName}</Nickname>
        <Stats>
          <span>{`${gameInfo.kills}/${gameInfo.deaths}/${gameInfo.assists}`}</span>
          <span>{`${kda} : 1`}</span>
        </Stats>
      </Info>
      <Items>
        {summonerItemsArr.map((v, i) => {
          return <img key={i} src={`/img/item/${v}.png`} alt="summoner-item" onError={onErrorItemImg} />;
        })}
      </Items>
    </SummonerListItem>
  );
};

export default MatchDetailTotalSummoner;

const SummonerListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1% 2% 2% 2%;
  order: ${(props) => props.order};
`;

const ChampionImg = styled.div`
  position: relative;
  width: 10%;
  margin-right: 1%;

  & img {
    width: 100%;
    border-radius: 999px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 7%;
  }
`;

const Level = styled.span`
  position: absolute;
  bottom: -10%;
  left: -10%;
  padding: 5%;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;

  @media ${(props) => props.theme.tablet} {
    bottom: -7%;
    left: -7%;
  }
`;

const Spell = styled.div`
  width: 6%;

  & img {
    width: 100%;
    margin: 10%;
    border-radius: 20%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 3.5%;
  }
`;

const Rune = styled.div`
  width: 6%;
  margin-right: 3%;

  & img {
    width: 100%;
    margin: 10%;
    padding: 10%;
    background-color: #000000;
    border-radius: 999px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 3.5%;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 3%;
  text-align: center;
`;

const Nickname = styled.span`
  margin-bottom: 10%;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;

  & span:last-child {
    color: rgba(51, 51, 51, 0.5);
  }
`;

const Items = styled.div`
  display: flex;
  width: 48%;

  & img {
    width: 14%;
    border: 1px solid #ced4da;
    border-radius: 20%;
  }

  & img:last-child {
    border-radius: 999px;
  }
`;
