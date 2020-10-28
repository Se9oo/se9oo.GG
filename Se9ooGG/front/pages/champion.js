import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { PageTitle } from '../styles/layout/GlobalStyles';
import ChampionList from '../components/ChampionList';
import championData from '../json/champion.json';

function getChampionList() {
  const arr = [];
  for (let i in championData.data) {
    arr.push(i);
  }
  console.log(JSON.stringify(arr));
  return arr;
};

const Champion = () => {
  const champList = getChampionList();
  
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 챔피언</title>
      </Head>
      <PageTitle>챔피언</PageTitle>
      <ChampionList data={champList}/>
    </AppLayout>
  )
}

export default Champion;