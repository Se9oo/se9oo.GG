import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import { CommentHeader } from '../styles/pages/Pages';
import { LeftOutlined } from '@ant-design/icons';
import CommentCard from '../components/CommentCard';

const Comment = () => {
  const router = useRouter();
  const { postList } = useSelector((state) => (state.post));
  const commentList = postList.filter((v) => v.postId === router.query.postId)[0].comments;
  console.log(JSON.stringify(commentList));

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

export default Comment;