import React from 'react';
import { SummonerRankListItem } from '../styles/components/Components';

function getWinRate(win, lose) {
  return Math.floor((win / (win + lose)) * 100);
}

const SummonerRankItem = ({rank}) => {
  return (
    <SummonerRankListItem sort={rank.sort}>
      <h3>{rank.queueType}</h3>
      <img src={`./img/ranked-emblems/${rank.tier}.png`} alt="summoner-tier-img" />
      <span>{`${rank.tier} ${rank.rank}`}</span>
      <span>{`${rank.wins}승 ${rank.losses}패 ${getWinRate(rank.wins, rank.losses)}%`}</span>
    </SummonerRankListItem>
  );
};

export default SummonerRankItem;