import React from 'react';
import styled from 'styled-components';

const ChampionSpellsItem = ({ spell }) => {
  // br 제거
  const description = spell.description.replace(/<br>/g, '\n');
  return (
    <Spell>
      <img src={`/img/spell/${spell.image.full}`} alt="spell-image" />
      <Name>{spell.name}</Name>
      <Info>
        <Description>{`${description}`}</Description>
      </Info>
    </Spell>
  );
};

export default ChampionSpellsItem;

const Spell = styled.li`
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);

  &:last-child {
    border-bottom: none;
  }

  & img {
    width: 4.5rem;
    height: 4.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.strong`
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.5;
`;
