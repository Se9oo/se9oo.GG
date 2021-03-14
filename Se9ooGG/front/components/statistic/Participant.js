import React from 'react';
import { getChampionNameById } from '../../util/JsonUtil';
import styled from 'styled-components';

const Participant = ({ team }) => {
  return (
    <ul>
      {
        team.map((summoner) => {
          const championName = getChampionNameById(summoner.championId);

          return (
            <ParticipantItem key={summoner.participantId}>
              <img src={`/img/champion/${championName.eng}.png`} alt="champion-img" />
              <span>{summoner.summonerName}</span>
            </ParticipantItem>
          )
        })
      }
    </ul>
  );
};

export default Participant;

const ParticipantItem = styled.li`
  display: flex;
  align-items: center;

  & img {
    width: 2rem;
    margin-right: 5px;
  }

  & span {
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    width: 100px;
    overflow: hidden;
  }
`;