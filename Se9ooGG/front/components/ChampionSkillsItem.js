import React from 'react';
import styled from 'styled-components';

const ChampionSkillsItem = ({ skill }) => {
  return (
    <>
      <li>
        <ChampionSkillImg src={`/img/spell/${skill.image.full}`} img={skill.image}/>
      </li>
    </>
  );
};

const ChampionSkillImg = styled.img`
  width: 4rem;
  height: 4rem;
`;

export default ChampionSkillsItem;