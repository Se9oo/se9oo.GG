import React from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import champInfo from '../../json/champion/Ahri.json';
import ChampionSkillsItem from '../../components/ChampionSkillsItem';
import styled from 'styled-components';

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

export const ChampionInfoContainer = styled.section`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, .5);
  padding: 1rem;
`;

export const ChampionInfoImg = styled.img`
  width: 30%;
  height: 30%;
  margin-right: 1rem;
`;

export const ChampionDetail = styled.div`
  display: block;
  width: 100%;
`;

export const ChampionTitle = styled.div`
  order: 1;
  
  & h2 {
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.5;
    order: 2;
  }

  & strong {
    font-size: .8rem;
    color: #868E96;
    line-height: 1.5;
    order: 1;
  }
`;

export const ChampionSkills = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ChampionInfo;