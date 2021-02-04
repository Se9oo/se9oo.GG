import React from 'react'
import EtcChampionList from './EtcChampionList';
import { getChampionNameById } from '../util/JsonUtil';
import { getListOrder } from '../util/util';
import styled from 'styled-components';
import EtcChart from './EtcChart';

const MatchDetailEtc = ({ match }) => {
  const navItems = ['챔피언별 골드 획득', '챔피언별 경험치 획득', '챔피언별 CS'];
  const matchTimelines = match.matchTimelines.frames;

  // 모든 소환사 정보
  const allSummonerGameInfo = [...match.participants];
  // 승리팀 id
  const winTeamId = match.teams.find((team) => team.win === 'Win').teamId;
  // 패배팀 id
  const loseTeamId = match.teams.find((team) => team.win === 'Fail').teamId;
  // 승리팀 소환사 게임 정보
  const winTeamInfo = allSummonerGameInfo.filter((summoner) => summoner.teamId === winTeamId);
  // 패배팀 소환사 게임 정보
  const loseTeamInfo = allSummonerGameInfo.filter((summoner) => summoner.teamId === loseTeamId);

  // 승리팀 라인에 따른 배열 순서 정렬
  winTeamInfo.map((summoner) => {
    summoner.order = getListOrder(summoner.timeline.lane, summoner.timeline.role);
  });
  winTeamInfo.sort((a, b) => a.order - b.order);

  // 패배팀 라인에 따른 배열 순서 정렬
  loseTeamInfo.map((summoner) => {
    summoner.order = getListOrder(summoner.timeline.lane, summoner.timeline.role);
  });
  loseTeamInfo.sort((a, b) => a.order - b.order);
  // 승리팀 챔피언 이미지
  const winTeamImg = winTeamInfo.map((info) => {
    return getChampionNameById(info.championId).eng;
  });
  // 패배팀 챔피언 이미지
  const loseTeamImg = loseTeamInfo.map((info) => {
    return getChampionNameById(info.championId).eng;
  });
  // 승리, 패배팀 이미지 저장 arr
  let teamImg = [];
  teamImg.push(winTeamImg);
  teamImg.push(loseTeamImg);

  return (
    <>
      <EtcNav>
        {
          navItems.map((item, i) => <li key={i}>{item}</li>)
        }
      </EtcNav>
      <ChampSelect>
        <Title>챔피언 선택</Title>
        {
          teamImg.map((team, i) => {
            return (
              <React.Fragment key={i}>
                <EtcChampionList key={i} team={team} />
                {
                  i === 0 && <Vs>vs</Vs>
                }
              </React.Fragment>
            )
          })
        }
      </ChampSelect>
      <EtcChart matchTimelines={matchTimelines} />
    </>
  )
};

export default MatchDetailEtc;

const EtcNav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, .5);
`;

const ChampSelect = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);
`;

const Title = styled.h2`
  display: block;
  margin-bottom: 1rem;
  text-align: center;
  opacity: .6;
`;

const Vs = styled.span`
  display: block;
  margin: 1rem 0;
  text-align: center;
  opacity: .6;
`;