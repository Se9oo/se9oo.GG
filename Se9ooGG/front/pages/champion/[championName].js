import React from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import { ChampionInfoContainer } from '../../styles/pages/Pages';
import champInfo from '../../json/champion/Ahri.json';

const ChampionInfo = () => {
  const router = useRouter();
  return (
    <AppLayout>
      <ChampionInfoContainer>
        <h2>{router.query.championName}</h2>
        <img src={`/img/champion/${router.query.championName}.png`} />
      </ChampionInfoContainer>
    </AppLayout>
  );
};

export default ChampionInfo;