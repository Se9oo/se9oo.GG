import React from 'react';
import { getWinRate } from '../util/util';
import styled from 'styled-components';

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

const SummonerRankListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  order: ${props => props.sort};

  & img {
    width: 30%;
    height: 30%;
  }

  & h3 {
    font-size: 1.4rem;

    @media ${props => props.theme.tablet} {
      font-size: 1.2rem;
    }
  }

  & span {
    margin: .5rem 0;
    font-size: 1.2rem;
    color: #333333;
    
    @media ${props => props.theme.tablet} {
      font-size: 1rem;
    }
  }
`;

export default SummonerRankItem;