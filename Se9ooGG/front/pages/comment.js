import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import CommentCard from '../components/community/CommentCard';
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { loadPostsRequestAction } from '../reducer/post';

const Comment = () => {
  const router = useRouter();
  const dispatch = useDispatch('');
  const { postList } = useSelector((state) => state.post);
  const commentList = postList.filter((v) => v.postId === parseInt(router.query.postId))[0];

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostsRequestAction());
    }
  }, []);

  const onClickBackBtn = useCallback(() => {
    router.back();
  }, []);

  return (
    <AppLayout>
      <CommentHeader>
        <LeftOutlined onClick={onClickBackBtn} />
        <h2>댓글</h2>
      </CommentHeader>
      {commentList && <CommentCard commentList={commentList.comments} postId={router.query.postId} />}
    </AppLayout>
  );
};

const CommentHeader = styled.div`
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
