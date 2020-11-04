import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { PageTitle, PostSearchInput } from '../styles/pages/Pages';
import { useSelector } from 'react-redux';

const Community = () => {
  const { isLogin } = useSelector((state) => (state.user));
  const { postList } = useSelector((state) => (state.post));
  return (
    <AppLayout>
      <Head>
        <title>se9oo | 커뮤니티</title>
      </Head>
      <PageTitle>커뮤니티</PageTitle>
      <PostSearchInput
        placeholder="제목 검색"
        enterButton
      />
      {
          isLogin ? <PostForm /> : null
      }
      <div>
        {postList.map((v, i) => <PostCard data={v} key={i} />)}
      </div>
    </AppLayout>
  );
};

export default Community;