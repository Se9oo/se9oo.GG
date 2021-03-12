import { useRouter } from 'next/router';
import React from 'react';
import { getChampionFullInfoByName } from '../../util/JsonUtil';
import ChampionDetail from '../../components/ChampionDetail';

const ChampionInfoDetail = () => {
  const router = useRouter();
  const championName = router.query.championName;
  
  const champion = getChampionFullInfoByName(championName);

  return (
    <>
      <ChampionDetail champion={champion} />
    </>
  );
};

export default ChampionInfoDetail;