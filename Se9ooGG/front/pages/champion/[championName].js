import React from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import { ChampionDetail, ChampionInfoContainer, ChampionSkills, ChampionTitle } from '../../styles/pages/Pages';
import champInfo from '../../json/champion/Ahri.json';
import ChampionSkillsItem from '../../components/ChampionSkillsItem';

const ChampionInfo = () => {
  const router = useRouter();
  const champInfoObj = champInfo.data.Ahri;
  return (
    <AppLayout>
      <ChampionInfoContainer>
        <img src={`/img/champion/${router.query.championName}.png`} />
        <ChampionDetail>
          <ChampionTitle>
            <h2>아리</h2>
            <strong>구미호</strong>
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