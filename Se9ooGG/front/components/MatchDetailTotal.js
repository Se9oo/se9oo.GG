import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MatchDetailTotalSummoner from './MatchDetailTotalSummoner';

const MatchDetailTotal = ({ match }) => {
  const { summonerName } = useSelector((state) => (state.statistic.summoner));
  // 모든 소환사 유저 정보
  const allSummonersUserInfo = match.participantIdentities;
  // 검색 소환사 정보
  const summonerUserInfo = allSummonersUserInfo.find((summoner) => summoner.player.summonerName == summonerName);
  // 검색 소환사 게임 정보
  const summonerGameInfo = match.participants.find((summoner) => summoner.participantId === summonerUserInfo.participantId);
  // 검색 소환사 속한 팀 정보
  const summonerTeam = match.teams.find((team) => team.teamId === summonerGameInfo.teamId);
  // 상대팀 정보
  const otherTeam = match.teams.find((team) => team.gameId !== summonerGameInfo.teamId);
  // 검색 소환사 속한 팀원 게임 정보
  const summonerTeamSummonersGameInfo = match.participants.filter((v) => v.teamId == summonerGameInfo.teamId);
  // 상대 팀원 배열
  const otherTeamSummonersGameInfo = match.participants.filter((v) => v.teamId != summonerGameInfo.teamId);

  return (
    <>
      <MatchDetailTotalHeader>
        <WinOrLose winOrLose={summonerTeam.win}>
          {summonerTeam.win === 'Win' ? '승리' : '패배'}
        </WinOrLose>
        <ObjectKillInfo>
          <dt>타워</dt>
          <dd>{`${summonerTeam.towerKills}`}</dd>
          <dt>용</dt>
          <dd>{`${summonerTeam.dragonKills}`}</dd>
          <dt>바론</dt>
          <dd>{`${summonerTeam.baronKills}`}</dd>
        </ObjectKillInfo>
      </MatchDetailTotalHeader>
      <MatchDetailTotalSummonersList>
        {
          summonerTeamSummonersGameInfo.map((info) => {
            return <MatchDetailTotalSummoner gameInfo={info}/>
          })
        }
      </MatchDetailTotalSummonersList>
      <MatchDetailTotalHeader>
        <WinOrLose winOrLose={otherTeam.win}>
          {otherTeam.win === 'Win' ? '승리' : '패배'}
        </WinOrLose>
        <ObjectKillInfo>
          <dt>타워</dt>
          <dd>{`${otherTeam.towerKills}`}</dd>
          <dt>용</dt>
          <dd>{`${otherTeam.dragonKills}`}</dd>
          <dt>바론</dt>
          <dd>{`${otherTeam.baronKills}`}</dd>
        </ObjectKillInfo>
      </MatchDetailTotalHeader>
      <MatchDetailTotalSummonersList>
        {
          otherTeamSummonersGameInfo.map((info) => {
            return <MatchDetailTotalSummoner gameInfo={info}/>
          })
        }
      </MatchDetailTotalSummonersList>
    </>
  );
};

export default MatchDetailTotal;

const MatchDetailTotalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.2rem;
`;

const WinOrLose = styled.span`
  width: 50%;
  ${props => {
    if (props.winOrLose === 'Win') {
      return `color: #339af0;`;
    } else {
      return `color: #e03131;`;
    }
  }}
`;

const ObjectKillInfo = styled.dl`
  display: flex;
  justify-content: flex-end;
  width: 50%;

  & dt:after {
    content: ':';
  }
  & dt, dd {
    margin-right: .5rem;
  }
`;

const MatchDetailTotalSummonersList = styled.ul`

`;