import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const EtcChart = ({ matchTimelines }) => {

  let eachParticipantsTimeLines = Array.from(Array(10), () => Array(1).fill(null));
  matchTimelines.map((timeLine, i) => {
    const time = timeLine.participantFrames;
    for ( let value in time) {
      eachParticipantsTimeLines[time[value].participantId - 1][i] = time[value];
    }
  });

  let totalData = [];
  eachParticipantsTimeLines.map((participant) => {
    let totalGoldArr = [];
    let participantId;
    participant.map((summoner, i) => {
      i === 0 ? participantId = summoner.participantId : totalGoldArr.push(summoner.totalGold);
    });

    totalData.push({
      name: participantId,
      data: totalGoldArr
    });
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