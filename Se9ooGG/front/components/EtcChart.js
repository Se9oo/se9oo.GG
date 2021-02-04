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
  console.log(eachParticipantsTimeLines);

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
    series: [{
      name: 1,
      data: [500, 700, 1000]
    }, {
      name: 2,
      data: [300, 900, 2000]
    }, {
      name: 3,
      data: [400, 1000, 5000]
    }]
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