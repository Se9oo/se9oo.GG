import React from 'react';
import ChampionSpellsItem from './ChampionSpellsItem';
import styled from 'styled-components';

const ChampionSpells = ({ spells }) => {
  return (
    <article>
      <SubTitle>스킬</SubTitle>
      <SpellList>
        {spells.map((spell) => {
          return <ChampionSpellsItem key={spell.id} spell={spell} />;
        })}
      </SpellList>
    </article>
  );
};

export default ChampionSpells;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const SpellList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;
