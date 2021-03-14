import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getColorByParticipantId } from '../../util/util';
import styled from 'styled-components';

// 데이터 단위 세팅
function getValueName (selectedNav) {
  switch (selectedNav) {
    case 1:
      return 'Gold';
    case 2:
      return 'xp';
    case 3:
      return 'cs';
  }
};

const EtcChart = ({ matchTimelines, selectedChampList, selectedNav }) => {
  // 소환사별 타임라인 배열 생성
  let eachParticipantsTimeLines = Array.from(Array(10), () => Array(1).fill(null));
  // 할당
  let categories = [];
  matchTimelines.map((timeLine, i) => {
    const time = timeLine.participantFrames;
    for ( let value in time) {
      eachParticipantsTimeLines[time[value].participantId - 1][i] = time[value];
    }
    categories.push(i);
  });

  let totalData = [];
  eachParticipantsTimeLines.map((participant, idx) => {
    let selectedChampionIdx = selectedChampList.findIndex((champion) => champion.id === participant[idx].participantId);
    if (selectedChampionIdx !== -1) {
      let eachTotalData = [];
      participant.map((summoner) => {
        if (selectedNav === 1) {
          eachTotalData.push(summoner.totalGold);
        } else if (selectedNav === 2) {
          eachTotalData.push(summoner.xp);
        } else {
          eachTotalData.push(summoner.minionsKilled + summoner.jungleMinionsKilled);
        }
      });
  
      totalData.push({
        name: selectedChampList[selectedChampionIdx].name,
        data: eachTotalData,
        color: getColorByParticipantId(participant[idx].participantId),
      });
    }
  });

  // 데이터 단위
  const valueName = getValueName(selectedNav);
  const options = {
    title: {
      text: null
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: categories,
      labels: {
        format: '{value} 분'
      }
    },
    yAxis: {
      title: {
        text: null
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        const img = `
          <img src="/img/champion/${this.series.name}.png"
            style="width: 20px; height: 20px; margin-right: 2px"
          />
        `;
        return `
          ${this.x}분
          <div style="display: flex;">
            ${img}<span style="font-weight: 700">: ${this.y} ${valueName}</span>
          </div>
        `;
      }
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        }
      }
    },
    series: totalData,
  };

  return (
    <ChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartWrapper>
  )
};

export default EtcChart;

const ChartWrapper = styled.div`
  padding: .5rem;
`;