import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLabel } from 'victory';
import styled from 'styled-components';

const MatchDetailAnalysis = ({ match }) => {
  const data = [
    { summoner: 1, damage: 13000 },
    { summoner: 2, damage: 8000 },
    { summoner: 3, damage: 5000 },
    { summoner: 4, damage: 4000 },
    { summoner: 5, damage: 13000 },
  ];
  const data2 = [
    { summoner: 6, damage: 13000 },
    { summoner: 7, damage: 8000 },
    { summoner: 8, damage: 5000 },
    { summoner: 9, damage: 8000 },
    { summoner: 10, damage: 4000 }, 
  ];
  return (
    <ChartWrapper>
      <VictoryChart
        domainPadding={20}
      >
        <VictoryAxis 
          tickValues={[1, 2, 3, 4,5,6,7,8,9,10]}
          axisLabelComponent={<img src="/img/champion/Ahri.png" />}
        />
        <VictoryAxis
          dependentAxis
        />
        <VictoryGroup>
          <VictoryBar 
            data={data}
            x="summoner"
            y="damage"
            style={{ data: { fill: '#339af0' } }}
            animate={{
              duration: 500,
              onLoad: { duration: 500 }
            }}
          />
        </VictoryGroup>
        <VictoryGroup>
          <VictoryBar 
            data={data2}
            x="summoner"
            y="damage"
            style={{ data: { fill: '#e03131' } }}
            animate={{
              duration: 500,
              onLoad: { duration: 500 }
            }}
          />
        </VictoryGroup>
      </VictoryChart>
    </ChartWrapper>
  );
};

export default MatchDetailAnalysis;

const ChartWrapper = styled.div`
  padding: 0 5%;
`;