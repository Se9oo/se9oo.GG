import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelChampionCommentAction } from '../../reducer/champion';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ChampionCommentsItem = ({ comment }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch('');

  const onClickCancelBtn = useCallback(() => {
    dispatch(cancelChampionCommentAction({ commentId: comment.commentId }));
  }, []);

  return (
    <Comment>
      <CommentItem>
        <Content>{comment.content}</Content>
        {me && me.email === comment.userEmail && <CommentCancelButton onClick={onClickCancelBtn} />}
      </CommentItem>
      <UserName>{`- ${comment.userNickname} -`}</UserName>
    </Comment>
  );
};

export default ChampionCommentsItem;

const Comment = styled.li`
  position: relative;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.1rem;
`;

const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Content = styled.p`
  padding: 1rem;
  word-break: break-all;
`;

const CommentCancelButton = styled(CloseOutlined)`
  padding-right: 1rem;
  cursor: pointer;

  & :active {
    opacity: 0.5;
  }
`;

const UserName = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
`;
