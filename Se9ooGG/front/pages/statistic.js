import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { Summoner, SummonerMostChampion, SummonerRank } from '../styles/pages/Pages';
import { Button } from 'antd';
import SummonerRankItem from '../components/SummonerRankItem';
import SummonerMostChampionItem from '../components/SummonerMostChampionItem';

const Statistic = () => {
  const { summoner } = useSelector((state) => state.statistic);

  return (
    <AppLayout>
      <Summoner>
        <img src={`./img/profileicon/${summoner.profileIconId}.png`} alt="summoner-profile-icon"/>
        <strong>{summoner.summonerName}</strong>
        <Button type="primary">인게임 정보</Button>
      </Summoner>
      <SummonerRank>
        <ul>
          {
            summoner.tier.map((rank) => <SummonerRankItem key={rank.queueType} rank={rank}/>)
          }
        </ul>
      </SummonerRank>
      <SummonerMostChampion>
        <ul>
          {
            summoner.proficiencyTop3.map((most) => <SummonerMostChampionItem key={most.championId} most={most} />)
          }
        </ul>
      </SummonerMostChampion>
    </AppLayout>
  );
};

export default Statistic;