import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/community/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostRequestAction } from '../reducer/post';
import { Button, Input } from 'antd';
import styled from 'styled-components';

const Community = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const { postList } = useSelector((state) => state.post);

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
      <PostSearchInput placeholder="제목 검색" enterButton />
      {me ? (
        <PostAddBtn type="primary" onClick={onClickAddPostBtn}>
          글쓰기
        </PostAddBtn>
      ) : null}
      {postList && postList.map((v) => <PostCard data={v} key={v.postId} />)}
    </AppLayout>
  );
};

const PostSearchInput = styled(Input.Search)`
  margin: 1rem 0;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

const PostAddBtn = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
`;

export default Community;
