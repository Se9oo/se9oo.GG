import React from 'react';
import styled from 'styled-components';

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

export const SummonerRankListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  order: ${props => props.sort};

  & img {
    width: 40%;
    height: 40%;
  }

  & h3 {
    font-size: 1.4rem;
  }

  & span {
    margin: .5rem 0;
    font-size: 1.2rem;
    color: #333333;
  }
`;

export default SummonerRankItem;