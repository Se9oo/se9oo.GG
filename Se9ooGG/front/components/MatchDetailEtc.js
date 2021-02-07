import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import EtcChampionList from './EtcChampionList';
import { getChampionNameById } from '../util/JsonUtil';
import { getListOrder } from '../util/util';
import styled from 'styled-components';
import EtcChart from './EtcChart';

const MatchDetailEtc = memo(({ match }) => {
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
    return {
      id: info.participantId,
      name: getChampionNameById(info.championId).eng
    };
  });
  // 패배팀 챔피언 이미지
  const loseTeamImg = loseTeamInfo.map((info) => {
    return { 
      id: info.participantId,
      name: getChampionNameById(info.championId).eng
    };
  });
  // 승리, 패배팀 이미지 저장 arr
  const teamImg = [winTeamImg, loseTeamImg];
  // 검색 소환사 이름
  const { summonerName } = useSelector((state) => (state.statistic.summoner));
  // 검색 소환사 정보
  const findSummonerInfo = allSummonerGameInfo.find((summoner) => summoner.summonerName == summonerName);
  // 선택한 챔피언 state (초기값은 검색 소환사)
  const [selectChampList, setSelectChampList] = useState([{
    id: findSummonerInfo.participantId,
    name: getChampionNameById(findSummonerInfo.championId).eng
  }]);
  // 정보를 조회할 챔피언 선택시 setState 처리
  const onClickSelectChamp = useCallback((champ) => {
    const idx = selectChampList.findIndex((selectedChamp) => selectedChamp.id === champ.id);
    if (idx === -1) {
      setSelectChampList([...selectChampList, champ]);
    } else {
      const tempList = [...selectChampList];
      tempList.splice(idx, 1);
      setSelectChampList([...tempList]);
    }
  }, [selectChampList]);

  return (
    <>
      <EtcNav>
        {
          navItems.map((item, i) => <li key={i}>{item}</li>)
        }
      </EtcNav>
      <ChampSelect>
        <Title>챔피언 선택</Title>
        <EtcChampionList teamList={teamImg} selectedChampList={selectChampList} onClickSelectChamp={onClickSelectChamp}/>
      </ChampSelect>
      <EtcChart matchTimelines={matchTimelines} selectedChampList={selectChampList} />
    </>
  )
});

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
`;