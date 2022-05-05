import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChampionNameById } from '../../util/JsonUtil';
import { getListOrder } from '../../util/util';
import EtcChampionList from './EtcChampionList';
import EtcChart from './EtcChart';
import styled from 'styled-components';

const MatchDetailEtc = memo(({ match, winOrLose }) => {
  const navItems = ['챔피언별 골드 획득', '챔피언별 경험치 획득', '챔피언별 CS'];
  // 선택한 nav state
  const [selectedNav, setSelectedNav] = useState(1);
  const onClickNavList = useCallback(
    (num) => () => {
      setSelectedNav(num);
    },
    [selectedNav]
  );

  const matchTimelines = match.matchTimelines.info.frames;
  // 모든 소환사 정보
  const allSummonerGameInfo = [...match.info.participants];
  // 승리팀 id
  const winTeamId = match.info.teams.find((team) => team.win).teamId;
  // 패배팀 id
  const loseTeamId = match.info.teams.find((team) => !team.win).teamId;
  // 승리팀 소환사 게임 정보
  const winTeamInfo = allSummonerGameInfo.filter((summoner) => parseInt(summoner.teamId) === parseInt(winTeamId));
  // 패배팀 소환사 게임 정보
  const loseTeamInfo = allSummonerGameInfo.filter((summoner) => parseInt(summoner.teamId) === parseInt(loseTeamId));

  // 승리팀 라인에 따른 배열 순서 정렬
  winTeamInfo
    .map((summoner) => {
      summoner.order = getListOrder(summoner.lane, summoner.role);
    })
    .sort((a, b) => a.order - b.order);

  // 패배팀 라인에 따른 배열 순서 정렬
  loseTeamInfo
    .map((summoner) => {
      summoner.order = getListOrder(summoner.lane, summoner.role);
    })
    .sort((a, b) => a.order - b.order);
  // 승리팀 챔피언 이미지
  const winTeamImg = winTeamInfo.map((info) => {
    return {
      id: info.participantId,
      name: getChampionNameById(info.championId).eng,
    };
  });
  // 패배팀 챔피언 이미지
  const loseTeamImg = loseTeamInfo.map((info) => {
    return {
      id: info.participantId,
      name: getChampionNameById(info.championId).eng,
    };
  });
  // 승리, 패배팀 이미지 저장 arr
  const teamImg = [winTeamImg, loseTeamImg];
  // 검색 소환사 이름
  const { summonerName } = useSelector((state) => state.statistic.summoner);
  // 검색 소환사 정보
  const findSummonerInfo = allSummonerGameInfo.find((summoner) => summoner.summonerName == summonerName);
  // 선택한 챔피언 state (초기값은 검색 소환사)
  const [selectChampList, setSelectChampList] = useState([
    {
      id: findSummonerInfo.participantId,
      name: getChampionNameById(findSummonerInfo.championId).eng,
    },
  ]);
  // 정보를 조회할 챔피언 선택시 setState 처리
  const onClickSelectChamp = useCallback(
    (champ) => {
      const idx = selectChampList.findIndex((selectedChamp) => selectedChamp.id === champ.id);
      if (idx === -1) {
        setSelectChampList([...selectChampList, champ]);
      } else {
        const tempList = [...selectChampList];
        tempList.splice(idx, 1);
        setSelectChampList([...tempList]);
      }
    },
    [selectChampList]
  );

  return (
    <>
      <EtcNav selectedNav={selectedNav} winOrLose={winOrLose}>
        {navItems.map((item, i) => {
          return (
            <li key={i} onClick={onClickNavList(i + 1)}>
              {item}
            </li>
          );
        })}
      </EtcNav>
      <ChampSelect>
        <Title>챔피언 선택</Title>
        <EtcChampionList
          teamList={teamImg}
          selectedChampList={selectChampList}
          onClickSelectChamp={onClickSelectChamp}
        />
      </ChampSelect>
      <EtcChart matchTimelines={matchTimelines} selectedChampList={selectChampList} selectedNav={selectedNav} />
    </>
  );
});

export default MatchDetailEtc;

const EtcNav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);

  & li {
    position: relative;
    width: 33.3%;
    padding: 1rem 0;
    cursor: pointer;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    work-wrap: normal;
    overflow: hidden;
  }

  & li::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0px;
    height: 2px;
    ${(props) => {
      if (props.winOrLose === '승') {
        return `background-color: #339af0;`;
      } else {
        return `background-color: #e03131;`;
      }
    }}
  }

  & li:nth-child(${(props) => props.selectedNav})::after {
    width: 100%;
  }
`;

const ChampSelect = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, 0.5);
`;

const Title = styled.h2`
  display: block;
  margin-bottom: 1rem;
  text-align: center;
`;
