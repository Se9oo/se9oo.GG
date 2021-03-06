import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Comment, Empty, Form, Input } from 'antd';
import { addCommentRequestAction } from '../../reducer/post';
import { errorModal } from '../CommonModal';
import CommentItem from './CommentItem';
import styled from 'styled-components';

const CommentCard = memo(({ commentList, postId }) => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const { addCommentLoading } = useSelector((state) => state.post);

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
    dispatch(
      addCommentRequestAction({
        content: commentText,
        postId: postId,
      })
    );
    setCommentText('');
  }, [postId, commentText]);

  return (
    <CommentContainer>
      {commentList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>등록된 댓글이 없습니다.</Empty>}
      {commentList.length > 0 &&
        commentList.map((comment) => <CommentItem key={comment.commentId} comment={comment} postId={postId} />)}
      {me && (
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
                  <Button type="primary" htmlType="submit" loading={addCommentLoading}>
                    게시
                  </Button>
                </CommentBtn>
              </CommentForm>
            </>
          }
        />
      )}
    </CommentContainer>
  );
});

const CommentContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, 0.5);
  @media ${(props) => props.theme.tablet} {
    border-top: none;
  }
`;

const CommentForm = styled(Form)`
  padding: 1rem 0;
`;

const CommentBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;

  & button {
    display: flex;
  }
`;

export default CommentCard;
