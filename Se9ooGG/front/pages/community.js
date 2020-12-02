import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import { PageTitle, PostAddBtn, PostSearchInput } from '../styles/pages/Pages';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostRequestAction } from '../reducer/post';

const Community = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));
  const { postList } = useSelector((state) => (state.post));

  const onClickAddPostBtn = useCallback(() => {
    Router.push('/editPost');
  }, []);

  useEffect(() => {
    dispatch(loadPostRequestAction());
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
          me 
          ? <PostAddBtn 
            type="primary"
            onClick={onClickAddPostBtn}
            >
              글쓰기
            </PostAddBtn> 
          : null
      }
      {
        postList && postList.map((v) => <PostCard data={v} key={v.postId} />)
      }
    </AppLayout>
  );
};

export default Community;