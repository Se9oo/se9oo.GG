import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

const ChampionStats = ({ stats }) => {
  // stat data
  const statsData = [stats.attackdamage, stats.armor, stats.spellblock, stats.hp, stats.mp, stats.attackrange];

  const options = {
    chart: {
      type: 'column',
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
      categories: ['공격', '방어', '마법방어', '체력', '마나', '사거리'],
      width: '95%',
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          color: 'rgba(0, 0, 0, .5)',
        },
      },
    },
    series: [
      {
        data: statsData,
      },
    ],
  };

  return (
    <article>
      <SubTitle>스탯</SubTitle>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </article>
  );
};

export default ChampionStats;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;
