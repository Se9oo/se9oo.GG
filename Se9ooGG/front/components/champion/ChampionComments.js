import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChampionCommentsAction } from '../../reducer/champion';
import ChampionCommentsItem from './ChampionCommentsItem';
import { Empty, Pagination } from 'antd';
import styled from 'styled-components';

const ChampionComments = ({ name }) => {
  const dispatch = useDispatch('');
  const { championCommentsList, totalCommentsCount } = useSelector((state) => state.champion);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadChampionCommentsAction({ name, page: currentPage }));
  }, [currentPage]);

  const onChangePaging = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <Comments>
      <SubTitle>챔피언 한줄평</SubTitle>
      {championCommentsList.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>등록된 한줄평이 없습니다.</Empty>
      ) : (
        <>
          <CommentList>
            {championCommentsList.map((comment) => {
              return <ChampionCommentsItem key={comment.commentId} comment={comment} />;
            })}
          </CommentList>
          <Paging onChange={onChangePaging} defaultCurrent={1} pageSize={3} total={totalCommentsCount} />
        </>
      )}
    </Comments>
  );
};

export default ChampionComments;

const Comments = styled.article`
  position: relative;

  & :after {
    content: '';
    display: block;
    clear: both;
  }
`;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const CommentList = styled.ul`
  height: 70%;
  overflow-y: auto;
`;

const Paging = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;
