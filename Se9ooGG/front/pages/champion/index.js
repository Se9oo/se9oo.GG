import React from 'react';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import Champion from '../../components/champion/Champion';
import { getChampionList } from '../../util/JsonUtil';

const ChampionInfo = () => {
  // total champion list
  const champList = getChampionList();

  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 챔피언</title>
      </Head>
      <Champion champion={champList} />
    </AppLayout>
  );
};

export default ChampionInfo;
