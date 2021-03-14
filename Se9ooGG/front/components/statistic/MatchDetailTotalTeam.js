import React from 'react';
import MatchDetailTotalSummoner from './MatchDetailTotalSummoner';
import styled from 'styled-components';

const MatchDetailTotalTeam = ({ index, team, gameInfo }) => {
  return (
    <>
      <MatchDetailTotalHeader index={index}>
        <WinOrLose winOrLose={team.win}>
          {team.win === 'Win' ? '승리' : '패배'}
        </WinOrLose>
        <ObjectKillInfo>
          <dt>타워</dt>
          <dd>{`${team.towerKills}`}</dd>
          <dt>용</dt>
          <dd>{`${team.dragonKills}`}</dd>
          <dt>바론</dt>
          <dd>{`${team.baronKills}`}</dd>
        </ObjectKillInfo>
      </MatchDetailTotalHeader>
      <MatchDetailTotalSummonersList>
        {
          gameInfo.map((info, i) => {
            return <MatchDetailTotalSummoner key={i} gameInfo={info}/>
          })
        }
      </MatchDetailTotalSummonersList>
    </>
  )
};

const MatchDetailTotalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  ${props => {
    if (props.index === 1) {
      return `border-top: 1px solid rgba(206, 212, 218, .5);`;
    }
  }}
  border-bottom: 1px solid rgba(206, 212, 218, .5);
  font-size: 1.2rem;
`;

const WinOrLose = styled.span`
  width: 50%;
  ${props => {
    if (props.winOrLose === 'Win') {
      return `color: #339af0;`;
    } else {
      return `color: #e03131;`;
    }
  }}
`;

const ObjectKillInfo = styled.dl`
  display: flex;
  justify-content: flex-end;
  width: 50%;

  & dt:after {
    content: ':';
  }
  & dt, dd {
    margin-right: .5rem;
  }
`;

const MatchDetailTotalSummonersList = styled.ul`
  display: flex;
  flex-direction: column;
  
  & first-child {
    border: 1px solid rgba(206, 212, 218, .5);
  }
`;

export default MatchDetailTotalTeam;