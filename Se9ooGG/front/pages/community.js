import React, { useCallback } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import { PageTitle, PostAddBtn, PostSearchInput } from '../styles/pages/Pages';
import { useSelector } from 'react-redux';

const Community = () => {
  const { isLogin } = useSelector((state) => (state.user));
  const { postList } = useSelector((state) => (state.post));

  const onClickAddPostBtn = useCallback(() => {
    Router.push('/editPost');
  }, []);
  
  return (
    <AppLayout>
      <Head>
        <title>se9oo | 커뮤니티</title>
      </Head>
      <PostSearchInput
        placeholder="제목 검색"
        enterButton
      />
      {
          isLogin 
          ? <PostAddBtn 
            type="primary"
            onClick={onClickAddPostBtn}
            >
              글쓰기
            </PostAddBtn> 
          : null
      }
      <div>
        {postList.map((v) => <PostCard data={v} key={v.postId} />)}
      </div>
    </AppLayout>
  );
};

export default Community;