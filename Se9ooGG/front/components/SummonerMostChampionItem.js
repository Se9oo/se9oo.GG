import React from 'react';
import { SummonerMostChampionListItem } from '../styles/components/Components';
import { getChampionNameById } from './JsonUtil';

const SummonerMostChampionItem = ({ most }) => {
  const championName = getChampionNameById(most.championId);
  return (
    <SummonerMostChampionListItem>
      <img src={`./img/champion/${championName.eng}.png`} alt="most-champion-img"/>
      <strong>{championName.kor}</strong>
      <span>{most.championPoints} pt</span>
    </SummonerMostChampionListItem>
  )
};

export default SummonerMostChampionItem;