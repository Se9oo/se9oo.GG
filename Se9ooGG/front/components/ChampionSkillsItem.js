import React from 'react';
import { ChampionSkillImg } from '../styles/components/Components';

const ChampionSkillsItem = ({ skill }) => {
  return (
    <>
      <li>
        <ChampionSkillImg src={`/img/spell/${skill.image.full}`} img={skill.image}/>
      </li>
    </>
  );
};

export default ChampionSkillsItem;