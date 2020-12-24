import React, { memo, useCallback, useState } from 'react';
import { Avatar, Comment } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentRequestAction } from '../reducer/post';
import CommonModal from './CommonModal';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const CommentItem = memo(({ comment, postId }) => {  
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));

  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal show
  const [showModal, setShowModal] = useState(false);

  const onOkDeleteCommentModal = useCallback(() => {
    dispatch(deleteCommentRequestAction({
      commentId: comment.commentId,
      postId: postId,
    }));
    setShowModal(false);
  }, []);

  const onCancelDeleteCommentModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickDeleteCommentBtn = useCallback(() => {
    setModalContent({
      title: "댓글 삭제",
      onOk: onOkDeleteCommentModal,
      onCancel: onCancelDeleteCommentModal,
      content: "삭제 하시겠습니까?"
    });
    setShowModal(true);
  }, []);

  return (
    <>
      <CommentItemContainer>
        <Comment
          author={comment.nickname}
          avatar={<Avatar>{comment.nickname.slice(0, 1)}</Avatar>}
          content={
            comment.content && 
            comment.content.split('\n').map((list, i) => {
              return (<span key={i}>{list}<br /></span>)
            })
          }
        />
        {
          me && 
          me.email === comment.email ? <CommentDeleteBtn onClick={onClickDeleteCommentBtn} />
          : null
        }
      </CommentItemContainer>
      <CommonModal modalContent={modalContent} visible={showModal} />
    </>
  );
});

const CommentItemContainer = styled.div`
  position: relative;
`;

const CommentDeleteBtn = styled(CloseOutlined)`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
  cursor: pointer;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  & svg:hover {
    color: #ff7875;
  }
`;

export default CommentItem;