import React from 'react';
import { getChampionNameById } from '../util/JsonUtil';
import styled from 'styled-components';

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

const SummonerMostChampionListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33%;

  & img {
    width: 40%;
    height: 40%;
    border-radius: 999px;

    @media ${props => props.theme.tablet} {
      width: 25%;
      height: 25%;
    }
  }

  & strong, span {
    margin-top: .5rem;
    font-size: 1.2rem;
    color: #333333;

    @media ${props => props.theme.tablet} {
      font-size: 1rem;
    }
  }
`;

export default SummonerMostChampionItem;