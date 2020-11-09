import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';

const Comment = () => {
  const router = useRouter();
  const { postList } = useSelector((state) => (state.post));
  const commentList = postList.filter((v) => v.postId === router.query.postId)[0].comments;
  console.log(JSON.stringify(commentList));
  return (
    <AppLayout>
      <div>
        {commentList && commentList[0].content}
      </div>
    </AppLayout>
  );
};

export default Comment;