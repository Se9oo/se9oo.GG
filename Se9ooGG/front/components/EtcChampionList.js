import React from 'react';
import styled from 'styled-components';

const EtcChampionList = ({ team }) => {

  return (
    <Team>
      {
        team.map((champ, i) => {
          return (
            <li key={i}>
              <ChampionImg key={`${champ}_${i}`} src={`/img/champion/${champ}.png`} alt="champion-image"/>
            </li>
          )
        })
      }
    </Team>
  )
};

export default EtcChampionList;

const Team = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ChampionImg = styled.img`
  width: 70%;
  margin: 0 auto;
`;