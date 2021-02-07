import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const EtcChart = ({ matchTimelines, selectedChampList }) => {

  // 소환사별 타임라인 배열 생성
  let eachParticipantsTimeLines = Array.from(Array(10), () => Array(1).fill(null));
  // 할당
  matchTimelines.map((timeLine, i) => {
    const time = timeLine.participantFrames;
    for ( let value in time) {
      eachParticipantsTimeLines[time[value].participantId - 1][i] = time[value];
    }
  });

  let totalData = [];
  eachParticipantsTimeLines.map((participant, idx) => {
    let selectedChampionIdx = selectedChampList.findIndex((champion) => champion.id === participant[idx].participantId);
    if (selectedChampionIdx !== -1) {
      let totalGoldArr = [];
      participant.map((summoner, i) => {
        i !== 0 && totalGoldArr.push(summoner.totalGold);
      });
  
      totalData.push({
        name: selectedChampList[selectedChampionIdx].name,
        data: totalGoldArr
      });
    }
  });

  const options = {
    title: {
      text: null
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: null
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