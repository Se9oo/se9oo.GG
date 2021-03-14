import React from 'react';
import BuildRunePerks from './BuildRunePerks';
import styled from 'styled-components';
import { getRuneImgUrl, getAllRuneImgUrl } from '../../util/JsonUtil';

const BuildRune = ({ rune }) => {

  // 선택한 룬 및 perk img
  const selectRuneImg = getRuneImgUrl(rune);
  // 선택한 룬의 모든 perk img
  const selectAllRuneImg = getAllRuneImgUrl(rune);
  // 선택한 룬의 statPerk id
  const selectStatPerk = [rune.statPerk0, rune.statPerk1, rune.statPerk2];

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
        <StatPerk>
          {
            selectStatPerk.map((statPerk, i) => {
              return (
                <li key={i}>
                  <img key={`${statPerk}_${i}`} src={`/img/perk-images/StatMods/${statPerk}.png`} alt="statPerk-image" />
                </li>
              )
            })
          }
        </StatPerk>
    </RuneList>
  );
};

export default BuildRune;

const RuneList = styled.div`
  display: flex;
  padding: .5rem;
  justify-content: center;
`;

const Rune = styled.div`
  width: 50%;
  border-right: 1px solid #e5e5e5;
`;

const MainRuneImg = styled.img`
  width: 3rem;
  margin: 0 auto 1rem;
  background-color: #e5e5e5;
  border-radius: 9999px;
`;

const StatPerk = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: .5rem;
  padding-bottom: .5rem;

  & img {
    width: 2.5rem;
    background-color: #000000;
    border: 1px solid #e5e5e5;
    border-radius: 9999px;
    margin-bottom: .5rem;
  }

  @media ${props => props.theme.laptop} {
    width: 33%;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & img {
      margin-right: .5rem;
      margin-bottom: 0;
    }
  }
`;