import React from 'react';
import ChampionTipsItem from './ChampionTipsItem';
import styled from 'styled-components';

const ChampionTips = ({ tips }) => {
  const allTips = [...tips];
  return (
    <article>
      <SubTitle>챔피언 팁</SubTitle>
      {allTips.map((tips, i) => {
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
      })}
    </article>
  );
};

export default ChampionTips;

const SubTitle = styled.div`
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
