import React from 'react';
import styled from 'styled-components';
import { getColorByParticipantId } from '../../util/util';

const EtcChampionList = ({ teamList, selectedChampList, onClickSelectChamp }) => {

  return (
    teamList.map((team, idx) => {
      return (
        <React.Fragment key={idx}>
          <Team key={idx}>
            {
              team.map((champ, i) => {
                let isSelected = false;
                selectedChampList.findIndex((champion) => champion.id === champ.id) === -1
                ? isSelected = false
                : isSelected = true;

                let color = getColorByParticipantId(champ.id);

                return (
                  <Champion isSelected={isSelected} key={i}>
                    <ChampionImg onClick={() => onClickSelectChamp(champ)} key={`${champ.name}_${i}`} src={`/img/champion/${champ.name}.png`} alt="champion-image"/>
                    <ParticipantColor color={color} />
                  </Champion>
                )
              })
            }
          </Team>
          {
            idx === 0 && <Vs>vs</Vs>
          }
        </React.Fragment>
      )
    })
  )
};

export default EtcChampionList;

const Team = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Champion = styled.li`
  ${props => {
    if (props.isSelected) {
      return `opacity: 1;`;
    } else {
      return `opacity: .3;`;
    }
  }}
`;

const ChampionImg = styled.img`
  width: 70%;
  margin: 0 auto;
  cursor: pointer;
`;

const ParticipantColor = styled.div`
  width: 70%;
  height: 10px;
  margin: 0 auto;
  background-color: ${props => props.color};
`;

const Vs = styled.span`
  display: block;
  margin: 1rem 0;
  text-align: center;
`;