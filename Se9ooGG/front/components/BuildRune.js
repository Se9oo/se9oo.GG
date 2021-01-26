import React from 'react';
import BuildRunePerks from './BuildRunePerks';
import styled from 'styled-components';
import { getRuneImgUrl, getAllRuneImgUrl } from './JsonUtil';

const BuildRune = ({ rune }) => {

  // 선택한 룬 및 perk img
  const selectRuneImg = getRuneImgUrl(rune);
  // 선택한 룬의 모든 perk img
  const selectAllRuneImg = getAllRuneImgUrl(rune);

  // 선택한 perk 체크 용도로 배열에 할당
  let selectPerks = [];
  for (let i in selectRuneImg) {
    selectPerks.push(selectRuneImg[i]);
  }
  
  return (
    <RuneList>
        {
          selectAllRuneImg.map((rune, idx) => {
            return (
              <Rune key={idx}>
                <MainRuneImg key={selectAllRuneImg[idx].id} src={`/img/${selectAllRuneImg[idx].icon}`} alt="primary-rune"/>
                {
                  rune.slots.map((perk, i) => {
                    return <BuildRunePerks key={i} perks={perk} selectPerks={selectPerks} />
                  })
                }
              </Rune>
            )
          })
        }
    </RuneList>
  );
};

export default BuildRune;

const RuneList = styled.div`
  display: flex;
  padding: 1rem;
`;

const Rune = styled.div`
  padding: .5rem;
  border-right: 1px solid #e5e5e5;
`;

const MainRuneImg = styled.img`
  margin: 0 auto;
  background-color: #e5e5e5;
  border-radius: 9999px;
`;