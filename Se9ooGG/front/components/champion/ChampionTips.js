import React from 'react';
import ChampionTipsItem from './ChampionTipsItem';
import { Empty } from 'antd';
import styled from 'styled-components';

const ChampionTips = ({ tips }) => {
  const allTips = [...tips];

  return (
    <article>
      <SubTitle>챔피언 팁</SubTitle>
      {allTips[0].length === 0 && allTips[1].length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>챔피언 팁이 없습니다.</Empty>
      ) : (
        allTips.map((tips, i) => {
          return (
            <React.Fragment key={`fragment_${i}`}>
              <Team key={`team_${i}`} team={i}>
                {i === 0 ? '아군' : '적군'}
              </Team>
              <ul key={`tips_${i}`}>
                {tips.map((tip, idx) => {
                  return <ChampionTipsItem key={idx} tip={tip} />;
                })}
              </ul>
            </React.Fragment>
          );
        })
      )}
    </article>
  );
};

export default ChampionTips;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const Team = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 1.1rem;
  ${(props) => {
    if (props.team === 0) {
      return `color: #339af0;`;
    } else {
      return `color: #e03131;`;
    }
  }}
`;
