import React, { useCallback, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getChampionNameById } from '../../util/JsonUtil';
import { getListOrder } from '../../util/util';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// chart data 명 표시
function getChartDataName(data) {
  switch (data) {
    case 'totalDamageDealtToChampions':
      return '챔피언에게 가한 피해';
    case 'goldEarned':
      return '골드 획득량';
    case 'kills':
      return '챔피언 처치';
    case 'wardsPlaced':
      return '와드 설치';
    case 'totalDamageTaken':
      return '받은 피해량';
    case 'cs':
      return 'CS';
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
  const winTeamInfo = allSummonerGameInfo.filter(
    (summoner) => summoner.teamId === winTeamId
  );
  // 패배팀 소환사 게임 정보
  const loseTeamInfo = allSummonerGameInfo.filter(
    (summoner) => summoner.teamId === loseTeamId
  );

  // 승리팀 라인에 따른 배열 순서 정렬
  winTeamInfo.map((summoner) => {
    summoner.order = getListOrder(
      summoner.timeline.lane,
      summoner.timeline.role
    );
  });
  winTeamInfo.sort((a, b) => a.order - b.order);

  // 패배팀 라인에 따른 배열 순서 정렬
  loseTeamInfo.map((summoner) => {
    summoner.order = getListOrder(
      summoner.timeline.lane,
      summoner.timeline.role
    );
  });
  loseTeamInfo.sort((a, b) => a.order - b.order);

  // chart에 꽂을 데이터명 state
  const [chartData, setChartData] = useState('totalDamageDealtToChampions');
  // chart data 종류
  const chartDataArr = [
    'totalDamageDealtToChampions',
    'goldEarned',
    'kills',
    'wardsPlaced',
    'totalDamageTaken',
    'cs',
  ];
  // chart data state change
  const onClickChartNextData = useCallback(() => {
    let nextIdx = chartDataArr.findIndex((e) => e === chartData) + 1;
    if (nextIdx === chartDataArr.length) {
      nextIdx = 0;
    }
    setChartData(chartDataArr[nextIdx]);
  }, [chartData]);
  // chart data state change
  const onClickChartPrevData = useCallback(() => {
    let prevIdx = chartDataArr.findIndex((e) => e === chartData) - 1;
    if (prevIdx === -1) {
      prevIdx = chartDataArr.length - 1;
    }
    setChartData(chartDataArr[prevIdx]);
  }, [chartData]);

  // 승리팀 chart data
  let winTeamTotalDamageDealtToChampions = []; // 챔피언에게 가한 피해
  let winTeamGoldEarned = []; // 골드 획득량
  let winTeamKills = []; // 챔피언 처치
  let winWardsPlaced = []; // 와드 설치
  let winTotalDamageTaken = []; // 받은 피해량
  let winCs = []; // CS;
  winTeamInfo.map((summoner) => {
    // champion name
    const championName = getChampionNameById(summoner.championId);
    // data
    winTeamTotalDamageDealtToChampions.push({
      name: championName.eng + '-win',
      y: summoner.stats.totalDamageDealtToChampions,
    });
    winTeamGoldEarned.push({
      name: championName.eng + '-win',
      y: summoner.stats.goldEarned,
    });
    winTeamKills.push({
      name: championName.eng + '-win',
      y: summoner.stats.kills,
    });
    winWardsPlaced.push({
      name: championName.eng + '-win',
      y: summoner.stats.wardsPlaced,
    });
    winTotalDamageTaken.push({
      name: championName.eng + '-win',
      y: summoner.stats.totalDamageTaken,
    });
    winCs.push({
      name: championName.eng + '-win',
      y: parseInt(
        summoner.stats.totalMinionsKilled + summoner.stats.neutralMinionsKilled,
        10
      ),
    });
  });

  // 패배팀 chart data
  let loseTeamTotalDamageDealtToChampions = []; // 챔피언에게 가한 피해
  let loseTeamGoldEarned = []; // 골드 획득량
  let loseTeamKills = []; // 챔피언 처치
  let loseWardsPlaced = []; // 와드 설치
  let loseTotalDamageTaken = []; // 받은 피해량
  let loseCs = []; // Cs
  loseTeamInfo.map((summoner) => {
    // champion name
    const championName = getChampionNameById(summoner.championId);
    // data
    loseTeamTotalDamageDealtToChampions.push({
      name: championName.eng + '-los',
      y: summoner.stats.totalDamageDealtToChampions,
    });
    loseTeamGoldEarned.push({
      name: championName.eng + '-los',
      y: summoner.stats.goldEarned,
    });
    loseTeamKills.push({
      name: championName.eng + '-los',
      y: summoner.stats.kills,
    });
    loseWardsPlaced.push({
      name: championName.eng + '-los',
      y: summoner.stats.wardsPlaced,
    });
    loseTotalDamageTaken.push({
      name: championName.eng + '-los',
      y: summoner.stats.totalDamageTaken,
    });
    loseCs.push({
      name: championName.eng + '-los',
      y: parseInt(
        summoner.stats.totalMinionsKilled + summoner.stats.neutralMinionsKilled,
        10
      ),
    });
  });

  // 선택한 chart data chart에 꽂기
  const getChartData = useCallback(
    (winOrLose) => {
      switch (chartData) {
        case 'totalDamageDealtToChampions':
          return winOrLose === 'win'
            ? winTeamTotalDamageDealtToChampions
            : loseTeamTotalDamageDealtToChampions;
        case 'goldEarned':
          return winOrLose === 'win' ? winTeamGoldEarned : loseTeamGoldEarned;
        case 'kills':
          return winOrLose === 'win' ? winTeamKills : loseTeamKills;
        case 'wardsPlaced':
          return winOrLose === 'win' ? winWardsPlaced : loseWardsPlaced;
        case 'totalDamageTaken':
          return winOrLose === 'win'
            ? winTotalDamageTaken
            : loseTotalDamageTaken;
        case 'cs':
          return winOrLose === 'win' ? winCs : loseCs;
      }
    },
    [chartData]
  );

  // chart options
  const options = {
    chart: {
      type: 'bar',
      style: {
        fontFamily: `'GmarketSansMedium', 'Sans-serif' !important`,
      },
    },
    title: {
      text: null,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: 'category',
      labels: {
        useHTML: true,
        formatter: function () {
          return `<img src="/img/champion/${this.value.slice(
            0,
            -4
          )}.png" alt="champion-img-${this.value.slice(
            0,
            -4
          )}" style="width: 2.5rem; text-align: center;"/>`;
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          color: 'rgba(0, 0, 0, .5)',
        },
      },
    },
    series: [
      {
        color: '#339af0',
        data: getChartData('win'),
      },
      {
        color: '#e03131',
        data: getChartData('lose'),
      },
    ],
  };

  return (
    <>
      <ChartSelector>
        <LeftSelectButton onClick={onClickChartPrevData} />
        <span>{getChartDataName(chartData)}</span>
        <RightSelectButton onClick={onClickChartNextData} />
      </ChartSelector>
      <GraphInfo>
        <WinLine></WinLine>
        <span>승리</span>
        <LoseLine></LoseLine>
        <span>패배</span>
      </GraphInfo>
      <ChartWrapper>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </ChartWrapper>
    </>
  );
};

export default MatchDetailAnalysis;

const ChartSelector = styled.div`
  position: relative;
  width: 100%;
  padding: 5%;
  text-align: center;
`;

const LeftSelectButton = styled(LeftOutlined)`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const RightSelectButton = styled(RightOutlined)`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const GraphInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & span {
    margin-right: 3%;
  }
`;

const WinLine = styled.span`
  width: 5%;
  height: 0.5rem;
  background-color: #339af0;
`;

const LoseLine = styled.span`
  width: 5%;
  height: 0.5rem;
  background-color: #e03131;
`;

const ChartWrapper = styled.div`
  padding: 0 5%;
`;
