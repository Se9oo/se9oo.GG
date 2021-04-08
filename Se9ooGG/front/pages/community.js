import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/community/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { loadPostRequestAction } from '../reducer/post';
import { Button, Input, Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Community = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const { postList, existMorePosts, loadPostLoading } = useSelector((state) => state.post);

  const onClickAddPostBtn = useCallback(() => {
    Router.push('/editPost');
  }, []);

  // 페이지 초기 실행시에만 postList 조회
  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostRequestAction(0));
    }
  }, []);

  // infinite scroll
  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 100) {
        if (existMorePosts && !loadPostLoading) {
          const lastPostId = postList[postList.length - 1].postId;
          dispatch(loadPostRequestAction(lastPostId));
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [existMorePosts, loadPostLoading]);

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
      {postList.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>등록된 게시글이 없습니다.</Empty>
      ) : (
        postList.map((v) => <PostCard data={v} key={v.postId} />)
      )}
      {loadPostLoading && (
        <Loading>
          <Spin indicator={<LoadingOutlined spin />} />
        </Loading>
      )}
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

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

export default Community;
