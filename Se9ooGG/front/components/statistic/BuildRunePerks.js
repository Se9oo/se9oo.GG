import React from 'react';
import styled from 'styled-components';

const BuildRunePerks = ({ perks, selectPerks }) => {
  const perkList = perks.runes;

  return (
    <PerkList>
      {
        perkList.map((perk, i) => {
          let choosen = false;
          // 선택한 perk 인지 체크
          if (selectPerks.indexOf(perk.icon) !== -1) {
            choosen = true;
          }
          return (
            <Perk key={`${perk.id}_${i}`} choosen={choosen}>
              <img key={perk.id} src={`/img/${perk.icon}`} alt="perk-images" />
            </Perk>
          )
        })
      }
    </PerkList>
  )
};

export default BuildRunePerks;

const PerkList = styled.ul`
  display: flex;
  justify-content: center;
`;

const Perk = styled.li`
  padding: .3rem;  

  & img {
    width: 2.4rem;
    background-color: #000000;
    border-radius: 9999px;
    ${props => {
      if (!props.choosen) {
        return `opacity: .3;`;
      }
    }}
  }
`;