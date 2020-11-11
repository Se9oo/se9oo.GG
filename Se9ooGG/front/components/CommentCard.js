import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Comment, Input } from 'antd';
import { CommentBtn, CommentContainer, CommentForm } from '../styles/components/Components';
import { addCommentRequestAction } from '../reducer/post';
import shortId from 'shortid';
import { errorModal } from './CommonModal';

const CommentCard = ({ commentList, postId }) => {
  const dispatch = useDispatch('');
  const { isLogin, me } = useSelector((state) => (state.user));
  const { addCommentLoading } = useSelector((state) => (state.post));
  
  // comment form
  const [commentText, setCommentText] = useState('');
  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmitComment = useCallback(() => {
    // 댓글 등록시 null check
    if (!commentText) {
      errorModal('댓글을 입력 해주세요.');
      return;
    }

    // 댓글 등록
    dispatch(addCommentRequestAction({
      user: {
        email: me.email,
        nickname: me.nickname,
      },
      commentId: shortId.generate(),
      content: commentText,
    }, postId));
    setCommentText('');
  }, [postId, commentText]);

  return (
    <CommentContainer>
      {        
        commentList.map((comment) => {
          return (
            <Comment
              key={comment.commentId} 
              author={comment.user.nickname}
              avatar={<Avatar>{comment.user.nickname.slice(0, 1)}</Avatar>}
              content={
                comment.content && 
                comment.content.split('\n').map((list, i) => {
                  return (<span key={i}>{list}<br /></span>)
                })
              }
            />
          )
        })
      }
      {
        isLogin && 
        me &&
        <Comment 
          avatar={<Avatar>{me.nickname.slice(0, 1)}</Avatar>}
          content={
            <>
              <CommentForm onFinish={onSubmitComment}>
                <Input.TextArea
                  rows={4}
                  placeholder="댓글은 작성자의 인성을 나타냅니다."
                  maxLength={100}
                  value={commentText}
                  onChange={onChangeCommentText}
                />
                <CommentBtn>
                  <Button type="primary" htmlType="submit" loading={addCommentLoading}>게시</Button>
                </CommentBtn>
              </CommentForm>
            </>
          }
        />
      }
    </CommentContainer>
  );
};

export default CommentCard;