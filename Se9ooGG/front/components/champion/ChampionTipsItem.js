import React from 'react';
import styled from 'styled-components';

const ChampionTipsItem = ({ tip }) => {
  return <TipItem>{`${tip}`}</TipItem>;
};

export default ChampionTipsItem;

const TipItem = styled.li`
  display: block;
  padding: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
`;
