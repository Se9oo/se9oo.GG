import React from 'react';
import { useRouter } from 'next/router';
import { getChampionFullInfoByName } from '../../util/JsonUtil';
import AppLayout from '../../components/AppLayout';
import ChampionDetail from '../../components/ChampionDetail';

const ChampionInfo = () => {
  const router = useRouter();
  const championInfo = getChampionFullInfoByName(router.query.championName);

  return (
    <AppLayout>
      <ChampionDetail champion={championInfo} />
    </AppLayout>
  );
};

export default ChampionInfo;