import React from 'react';
import InGameSummoner from './InGameSummoner';
import styled from 'styled-components';
import { getChampionNameById } from '../../util/JsonUtil';

const InGameSummonerList = ({ team, bannedList }) => {
  return (
    <SummonerList>
      {
        team.map((summoner, i) => {
          return <InGameSummoner key={i} summoner={summoner} />
        })
      }
      <SubTitle>밴 챔피언</SubTitle>
      <BannedChampionList>
        {
          bannedList.map((item, i) => {
            const championName = getChampionNameById(item.championId);
            return <img key={i} src={`/img/champion/${championName.eng}.png`} alt="banned-Champion-image" />
          })
        }
      </BannedChampionList>
    </SummonerList>
  );
};

export default InGameSummonerList;

const SummonerList = styled.ul`
  padding: 1rem;
  border-top: 1px solid rgba(206, 212, 218, .5);
`;

const SubTitle = styled.div`
  margin-top: .5rem;
  font-size: 1.2rem;
`;

const BannedChampionList = styled.div`
  display: flex;
  align-items: center;
  padding: .5rem 0 0;

  & span {
    font-size: 1.2rem;
    margin-right: .5rem;
  }

  & img {
    width: 2.5rem;
    margin-right: .5rem;
  }
`;