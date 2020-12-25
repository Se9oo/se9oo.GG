import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MatchDetailTotal = ({ match }) => {
  const { summonerName } = useSelector((state) => (state.statistic.summoner));
  const firstTeam = match.teams.find((team) => team.teamId === 100);
  const secondTeam = match.teams.find((team) => team.teamId === 200);
  const summonerUserInfo = match.participantIdentities.find((summoner) => summoner.player.summonerName == summonerName);
  const summonerGameInfo = match.participants.find((summoner) => summoner.participantId === summonerUserInfo.participantId);
  const summonerTeamId = summonerGameInfo.teamId;

  return (
    <MatchDetailTotalHeader>
      <span>total</span>
    </MatchDetailTotalHeader>
  );
};

export default MatchDetailTotal;

const MatchDetailTotalHeader = styled.div`
  display: flex;
`;