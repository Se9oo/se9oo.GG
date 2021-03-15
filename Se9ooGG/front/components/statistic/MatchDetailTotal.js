import React from 'react';
import { useSelector } from 'react-redux';
import MatchDetailTotalTeam from './MatchDetailTotalTeam';

const MatchDetailTotal = ({ match }) => {
  const { summonerName } = useSelector((state) => state.statistic.summoner);
  // 모든 소환사 정보
  let allSummonerGameInfo = [...match.participants];
  allSummonerGameInfo.map((summoner, i) => {
    summoner.summonerName = match.participantIdentities[i].player.summonerName;
  });
  // 검색 소환사 id
  const findSummonerParticipantId = allSummonerGameInfo.find(
    (summoner) => summoner.summonerName == summonerName
  ).participantId;
  // 검색 소환사 게임 정보
  const findSummonerGameInfo = allSummonerGameInfo.find(
    (summoner) => summoner.participantId === findSummonerParticipantId
  );
  // 검색 소환사 속한 팀 정보
  const summonerTeam = match.teams.find(
    (team) => team.teamId === findSummonerGameInfo.teamId
  );
  // 상대팀 정보
  const enemyTeam = match.teams.find(
    (team) => team.gameId !== findSummonerGameInfo.teamId
  );
  // 검색 소환사 속한 팀원 게임 정보
  const summonerTeamPlayersGameInfo = allSummonerGameInfo.filter(
    (v) => v.teamId == findSummonerGameInfo.teamId
  );
  // 상대 팀원 게임 정보
  const enemyTeamPlayersGameInfo = allSummonerGameInfo.filter(
    (v) => v.teamId != findSummonerGameInfo.teamId
  );

  return (
    <>
      <MatchDetailTotalTeam
        index={0}
        team={summonerTeam}
        gameInfo={summonerTeamPlayersGameInfo}
      />
      <MatchDetailTotalTeam
        index={1}
        team={enemyTeam}
        gameInfo={enemyTeamPlayersGameInfo}
      />
    </>
  );
};

export default MatchDetailTotal;
