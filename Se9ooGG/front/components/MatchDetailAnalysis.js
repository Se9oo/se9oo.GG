import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getChampionNameById } from './JsonUtil';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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

const MatchDetailAnalysis = ({ match }) => {
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

  // 승리팀 chart data
  let winTeamData = [];
  winTeamInfo.map((summoner) => {
    let summonerData = {};
    // champion name
    const championName = getChampionNameById(summoner.championId);
    // data setting
    summonerData.name = championName.eng;
    summonerData.y = summoner.stats.totalDamageDealtToChampions;
    // data
    winTeamData.push(summonerData);
  });

  // 패배팀 chart data
  let loseTeamData = [];
  loseTeamInfo.map((summoner) => {
    let summonerData = {};
    // champion name
    const championName = getChampionNameById(summoner.championId);
    // data setting
    summonerData.name = championName.eng;
    summonerData.y = summoner.stats.totalDamageDealtToChampions;
    // data
    loseTeamData.push(summonerData);
  });
  
  // chart options
  const options = {
    chart: {
      type: 'bar',
      style: {
        fontFamily: `'GmarketSansMedium', 'Sans-serif' !important`
      }
    },
    title: {
      text: null
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: 'category',
      labels: {
        useHTML: true,
        formatter: function() {
          return `<img src="/img/champion/${this.value}.png" alt="champion img" style="width: 2.5rem; text-align: center;"/>`;
        }
      },
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        enabled: false,
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          color: 'rgba(0, 0, 0, .5)'
        },
      }
    },
    series: [
      {
        color: '#339af0',
        data: winTeamData
      },
      {
        color: '#e03131',
        data: loseTeamData
      }
    ]
  }

  return (
    <>
      <ChartSelector>
        <LeftSelectButton />
        <span>챔피언에게 가한 피해</span>
        <RightSelectButton />
      </ChartSelector>
      <ChartWrapper>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </ChartWrapper>
    </>
  );
};

export default MatchDetailAnalysis;

const ChartSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5%;

  & span {
    margin: 0 5%;
  }
`;

const LeftSelectButton = styled(LeftOutlined)`
  cursor: pointer;
`;

const RightSelectButton = styled(RightOutlined)`
  cursor: pointer;
`;

const ChartWrapper = styled.div`
  padding: 0 5%;
`;