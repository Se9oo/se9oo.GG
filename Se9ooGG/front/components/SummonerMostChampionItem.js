import React from 'react';
import { SummonerMostChampionListItem } from '../styles/components/Components';

const SummonerMostChampionItem = ({ most }) => {
  return (
    <SummonerMostChampionListItem>
      <img src="./img/champion/Zyra.png" alt="most-champion-img"/>
    </SummonerMostChampionListItem>
  )
};

export default SummonerMostChampionItem;