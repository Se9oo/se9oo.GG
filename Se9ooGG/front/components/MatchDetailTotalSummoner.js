import React from 'react';
import styled from 'styled-components';
import { getChampionNameById } from './JsonUtil';

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
  const championName = getChampionNameById(gameInfo.championId);
  const order = getListOrder(gameInfo.timeline.lane, gameInfo.timeline.role);

  return (
    <SummonerListItem order={order}>
      <img src={`./img/champion/${championName.eng}.png`}/>
      <span>{gameInfo.summonerName}</span>
    </SummonerListItem>
  );
};

export default MatchDetailTotalSummoner;

const SummonerListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: .5rem 1rem;
  order: ${props => props.order};

  & img {
    width: 10%;
    border-radius: 999px;
  }
`;