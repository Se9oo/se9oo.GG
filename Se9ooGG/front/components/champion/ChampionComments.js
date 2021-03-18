import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChampionCommentsAction } from '../../reducer/champion';
import ChampionCommentsItem from './ChampionCommentsItem';
import { Empty } from 'antd';
import styled from 'styled-components';

const ChampionComments = ({ name }) => {
  const dispatch = useDispatch('');
  const { championCommentsList } = useSelector((state) => state.champion);

  useEffect(() => {
    dispatch(loadChampionCommentsAction(name));
  }, []);

  return (
    <article>
      <SubTitle>챔피언 한줄평</SubTitle>
      {championCommentsList.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>등록된 한줄평이 없습니다.</Empty>
      ) : (
        <CommentList>
          {championCommentsList.map((comment) => {
            return <ChampionCommentsItem key={comment.commentId} comment={comment} />;
          })}
        </CommentList>
      )}
    </article>
  );
};

export default ChampionComments;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const CommentList = styled.ul`
  & li:last-child {
    border-bottom: none;
  }
`;
