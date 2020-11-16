import React from 'react';
import { ChampionSkillImg } from '../styles/components/Components';

const ChampionSkillsItem = ({ skill }) => {
  return (
    <>
      <li>
        <ChampionSkillImg img={skill.image} />
      </li>
    </>
  );
};

export default ChampionSkillsItem;