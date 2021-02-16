import React from 'react';
import { getChampionNameById, getSpellNameById, getRuneImgUrl } from '../util/JsonUtil';
import styled from 'styled-components';

const InGameSummoner = ({ summoner }) => {
  // 소환사 선택 챔피언 이름
  const champName = getChampionNameById(summoner.championId);
  // 소환사 선택 spell
  const spell = getSpellNameById(summoner.spell1Id, summoner.spell2Id);
  // 소환사 선택 rune 정보
  const runeInfo = {
    perkPrimaryStyle: summoner.perks.perkStyle,
    perk0: summoner.perks.perkIds[0],
    perkSubStyle: summoner.perks.perkSubStyle,
  };
  // 소환사 선택 rune img 경로
  const rune = getRuneImgUrl(runeInfo);

  return (
    <ListItem>
      <ChampionImg src={`/img/champion/${champName.eng}.png`} alt="champion-image" />
      <Spell>
        <img src={`/img/spell/${spell[0].eng}.png`} alt="spell1" />
        <img src={`/img/spell/${spell[1].eng}.png`} alt="spell2" />
      </Spell>
      <Rune>
        <img src={`./img/${rune.perk0}`} alt="summoner-primary-rune"/>
        <img src={`./img/${rune.subPerk}`} alt="summoner-sub-rune"/>
      </Rune>
    </ListItem>
  );
};

export default InGameSummoner;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: .5rem 0;
`;

const ChampionImg = styled.img`
  width: 3rem;
  margin-right: .5rem;
  border-radius: 9999px;
`;

const Spell = styled.div`
  & img {
    width: 1.5rem;
  }
`;

const Rune = styled.div`
  & img {
    width: 1.5rem;
    background-color: #000000;
    border-radius: 999px;
  }
`;