import React from 'react';
import InGameSummoner from './InGameSummoner';
import styled from 'styled-components';

const InGameSummonerList = ({ team }) => {

  return (
    <SummonerList>
      {
        team.map((summoner, i) => {
          return <InGameSummoner key={i} summoner={summoner} />
        })
      }
    </SummonerList>
  );
};

export default InGameSummonerList;

const SummonerList = styled.ul`
  padding: 1rem;
  border-top: 1px solid rgba(206, 212, 218, .5);
`;