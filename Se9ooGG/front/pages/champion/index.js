import React from 'react';
import Head from 'next/head';
import AppLayout from '../../components/AppLayout';
import ChampionList from '../../components/champion/ChampionList';
import { getChampionList } from '../../util/JsonUtil';

const Champion = () => {
  // total champion list
  const champList = getChampionList();
  
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 챔피언</title>
      </Head>
      <ChampionList champion={champList}/>
    </AppLayout>
  )
}

export default Champion;