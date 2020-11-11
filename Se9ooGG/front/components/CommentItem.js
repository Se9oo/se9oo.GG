import React from 'react';
import { Avatar, Comment } from 'antd';
import { CommentDeleteBtn, CommentItemContainer } from '../styles/components/Components';
import { useSelector } from 'react-redux';

const CommentItem = ({ comment }) => {
  const { me } = useSelector((state) => (state.user));
  return (
    <CommentItemContainer>
      <Comment
        author={comment.user.nickname}
        avatar={<Avatar>{comment.user.nickname.slice(0, 1)}</Avatar>}
        content={
          comment.content && 
          comment.content.split('\n').map((list, i) => {
            return (<span key={i}>{list}<br /></span>)
          })
        }
      />
      {
        me && 
        me.email === comment.user.email ? <CommentDeleteBtn />
        : null
      }
    </CommentItemContainer>
  );
};

export default CommentItem;