import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { PageTitle } from '../styles/pages/Pages';
import { useSelector } from 'react-redux';

export const data = [
  {
    id: 1,
    title: '롤 재미써',
    nickname: '세구',
  },
  {
    id: 2,
    title: '롤롤롤',
    nickname: '네구',
  },
  {
    id: 3,
    title: 'lololol',
    nickname: '홍구',
  },
  {
    id: 4,
    title: '로르로르',
    nickname: '홍구',
  },
  {
    id: 5,
    title: 'like',
    nickname: '힝구',
  },
  {
    id: 6,
    title: 'karim',
    nickname: 'reo',
  },

];

const Community = () => {
  const { isLogin } = useSelector((state) => (state.user));
  return (
    <AppLayout>
      <Head>
        <title>se9oo | 커뮤니티</title>
      </Head>
      <PageTitle>커뮤니티</PageTitle>
      {
        isLogin ? <PostForm /> : null,
        data.map((v, i) => <PostCard data={v} key={i} />)
      }
    </AppLayout>
  );
};

export default Community;