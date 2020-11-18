import React from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import { ChampionDetail, ChampionInfoContainer, ChampionInfoImg, ChampionSkills, ChampionTitle } from '../../styles/pages/Pages';
import champInfo from '../../json/champion/Ahri.json';
import ChampionSkillsItem from '../../components/ChampionSkillsItem';

const ChampionInfo = () => {
  const router = useRouter();
  const champInfoObj = champInfo.data.Ahri;
  return (
    <AppLayout>
      <ChampionInfoContainer>
        <ChampionInfoImg src={`/img/champion/${router.query.championName}.png`} />
        <ChampionDetail>
          <ChampionTitle>
            <h2>{champInfoObj.name}</h2>
            <strong>{champInfoObj.title}</strong>
          </ChampionTitle>
          <ChampionSkills>
            {
              champInfoObj.spells.map((skill) => {
                return (
                  <ChampionSkillsItem skill={skill} />
                )
              })
            }
          </ChampionSkills>
        </ChampionDetail>
      </ChampionInfoContainer>
    </AppLayout>
  );
};

export default ChampionInfo;