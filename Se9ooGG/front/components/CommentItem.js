import React, { useCallback, useState } from 'react';
import { Avatar, Comment } from 'antd';
import { CommentDeleteBtn, CommentItemContainer } from '../styles/components/Components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentRequestAction } from '../reducer/post';
import CommonModal from './CommonModal';

const CommentItem = ({ comment, postId }) => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));

  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal show
  const [showModal, setShowModal] = useState(false);

  const onOkDeleteCommentModal = useCallback(() => {
    dispatch(deleteCommentRequestAction({
      commentId: comment.commentId,
    }, postId));
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
          me.email === comment.user.email ? <CommentDeleteBtn onClick={onClickDeleteCommentBtn} />
          : null
        }
      </CommentItemContainer>
      <CommonModal modalContent={modalContent} visible={showModal} />
    </>
  );
};

export default CommentItem;