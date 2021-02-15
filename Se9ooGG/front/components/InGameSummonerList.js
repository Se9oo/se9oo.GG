import React from 'react';
import InGameSummoner from './InGameSummoner';
import styled from 'styled-components';

const InGameSummonerList = ({ team }) => {

  return (
    <SummonerList>
      {
        team.map((summoner) => {
          return <InGameSummoner summoner={summoner} />
        })
      }
    </SummonerList>
  );
};

export default InGameSummonerList;

const SummonerList = styled.ul`
  padding: 1rem;
`;