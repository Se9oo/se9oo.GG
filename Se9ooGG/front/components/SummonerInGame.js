import React from 'react';
import { useSelector } from 'react-redux';
import InGameSummonerList from './InGameSummonerList';
import styled from 'styled-components';

const SummonerInGame = () => {
  const { inGame } = useSelector((state) => state.statistic);

  const team1 = inGame.participants.filter((summoner) => summoner.teamId === 100);
  const team2 = inGame.participants.filter((summoner) => summoner.teamId === 200);
  const teamArr = [team1, team2];

  return (
    <InGame>
      <SubTitle>인게임 정보</SubTitle>
      <div>
        {
          teamArr.map((team) => {
            return <InGameSummonerList team={team} />
          })
        }
      </div>
    </InGame>
  );
};

export default SummonerInGame;

const InGame = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);
`;

const SubTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, .5);
  font-size: 1.2rem;
`;