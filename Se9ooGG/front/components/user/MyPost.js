import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyPostRequestAction } from '../../reducer/post';
import PostCard from '../community/PostCard';
import { Empty } from 'antd';
import styled from 'styled-components';

const MyPost = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const { myPostList } = useSelector((state) => state.post);

  useEffect(() => {
    if (me) {
      dispatch(loadMyPostRequestAction());
    }
  }, [me]);

  return (
    <Container>
      <SubTitle>내 게시글</SubTitle>
      <PostList>
        {myPostList.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>등록된 게시글이 없습니다.</Empty>
        ) : (
          myPostList.map((v) => <PostCard data={v} key={v.postId} />)
        )}
      </PostList>
    </Container>
  );
};

export default MyPost;

const Container = styled.section`
  background-color: #ffffff;
  margin: 1rem 0;
  border: 1px solid rgba(206, 212, 218, 0.5);
`;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const PostList = styled.div`
  padding: 1rem;
`;
