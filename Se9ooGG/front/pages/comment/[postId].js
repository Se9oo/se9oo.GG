import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AppLayout from '../../components/AppLayout';
import CommentCard from '../../components/community/CommentCard';
import { loadCommentsRequestAction } from '../../reducer/post';
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Comments = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { commentList } = useSelector((state) => state.post);

  useEffect(() => {
    if (router.query.postId) {
      dispatch(loadCommentsRequestAction(router.query.postId));
    }
  }, [router.query.postId]);

  const onClickBackBtn = useCallback(() => {
    router.back();
  }, []);

  return (
    <AppLayout>
      <CommentHeader>
        <LeftOutlined onClick={onClickBackBtn} />
        <h2>댓글</h2>
      </CommentHeader>
      {commentList && <CommentCard commentList={commentList} postId={router.query.postId} />}
    </AppLayout>
  );
};

export default Comments;

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
