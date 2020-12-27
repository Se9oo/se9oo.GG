import React from 'react';
import styled from 'styled-components';
import { getChampionNameById } from './JsonUtil';

const MatchDetailTotalSummoner = ({ gameInfo }) => {
  const championName = getChampionNameById(gameInfo.championId);
  return (
    <SummonerListItem>
      <img src={`./img/champion/${championName.eng}.png`}/>
    </SummonerListItem>
  );
};

export default MatchDetailTotalSummoner;

const SummonerListItem = styled.li`
  width: 100%;
  padding: .5rem 1rem;

  & img {
    width: 10%;
    border-radius: 999px;
  }
`;