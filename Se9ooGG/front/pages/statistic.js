import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import SummonerRankItem from '../components/SummonerRankItem';
import SummonerMostChampionItem from '../components/SummonerMostChampionItem';
import SummonerMatchItem from '../components/SummonerMatchItem';
import { Button } from 'antd';
import styled from 'styled-components';
import { errorModal } from '../components/CommonModal';

const Statistic = () => {
  const { summoner } = useSelector((state) => state.statistic);

  useEffect(() => {
    if (Object.keys(summoner).length == 0) {
      errorModal(`사용자를 검색해주세요.\n메인 화면으로 이동합니다.`);
      Router.push('/');
    }
  }, [summoner])

  return (
    <AppLayout>
      {
        Object.keys(summoner).length != 0
        ?
        <>
          <Summoner>
            <img src={`./img/profileicon/${summoner.profileIconId}.png`} alt="summoner-profile-icon"/>
            <strong>{summoner.summonerName}</strong>
            <Button type="primary">인게임 정보</Button>
          </Summoner>
          <SummonerRank>
            <ul>
              {
                summoner.tier 
                ? summoner.tier.map((rank) => <SummonerRankItem key={rank.queueType} rank={rank}/>)
                : null
              }
            </ul>
          </SummonerRank>
          <SummonerMostChampion>
            <ul>
              {
                summoner.proficiencyTop3
                ? summoner.proficiencyTop3.map((most) => <SummonerMostChampionItem key={most.championId} most={most} />)
                : null
              }
            </ul>
          </SummonerMostChampion>
          <ul>
            {
              summoner.match
              ? summoner.match.map((match) => <SummonerMatchItem match={match} />)
              : null
            }
          </ul>
        </>
        : null
      }
    </AppLayout>
  );
};

export const Summoner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & img {
    width: 30%;
    height: 30%;
  }

  & strong {
    display: block;
    font-size: 2rem;
    margin: 1rem 0;
  }

  & button {
    width: 100%;
  }
`

export const SummonerRank = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SummonerMostChampion = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Statistic;