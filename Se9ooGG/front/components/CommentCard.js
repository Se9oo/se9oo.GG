import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Comment, Input } from 'antd';
import { CommentBtn, CommentContainer, CommentDeleteBtn, CommentForm } from '../styles/components/Components';
import { addCommentRequestAction } from '../reducer/post';
import shortId from 'shortid';
import { errorModal } from './CommonModal';
import CommentItem from '../components/CommentItem';

const CommentCard = ({ commentList, postId }) => {
  const dispatch = useDispatch('');
  const { loginDone, me } = useSelector((state) => (state.user));
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
       commentList.map((comment) => <CommentItem key={comment.commentId} comment={comment} postId={postId} />) 
      }
      {
        loginDone && 
        me &&
        <Comment 
          avatar={<Avatar>{me.nickname.slice(0, 1)}</Avatar>}
          author={me.nickname}
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