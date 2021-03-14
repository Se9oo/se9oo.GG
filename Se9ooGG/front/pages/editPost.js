import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/community/PostForm';

const editPost = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo | 글 등록</title>
      </Head>
      <PostForm />
    </AppLayout>
  );
};

export default editPost;