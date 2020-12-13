import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import CommentCard from '../components/CommentCard';
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Comment = () => {
  const router = useRouter();
  const { postList } = useSelector((state) => (state.post));
  let commentList = [];
  commentList = postList.filter((v) => v.postId === parseInt(router.query.postId))[0].comments;

  const onClickBackBtn = useCallback(() => {
    router.back();
  }, []);

  return (
    <AppLayout>
      <CommentHeader>
        <LeftOutlined onClick={onClickBackBtn}/>
        <h2>댓글</h2>
      </CommentHeader>
      <CommentCard commentList={commentList} postId={router.query.postId}/>
    </AppLayout>
  );
};

export const CommentHeader = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;

  & svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  & h2 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 20%);
    font-size: 2rem;
  }
`;

export default Comment;