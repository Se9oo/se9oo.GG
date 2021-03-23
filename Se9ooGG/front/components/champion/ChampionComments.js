import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChampionCommentsAction } from '../../reducer/champion';
import ChampionCommentsItem from './ChampionCommentsItem';
import ChampionWriteComments from './ChampionWriteComments';
import { infoModal } from '../CommonModal';
import { Empty, Pagination } from 'antd';
import styled from 'styled-components';

const ChampionComments = ({ championName }) => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const {
    championCommentsList,
    totalCommentsCount,
    addChampionCommentSuccess,
    cancelChampionCommentSuccess,
  } = useSelector((state) => state.champion);
  const [showMode, setShowMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(loadChampionCommentsAction({ championName, page: currentPage }));
  }, [currentPage]);

  // 한줄평이 등록되면
  useEffect(() => {
    if (addChampionCommentSuccess) {
      infoModal('성공적으로 등록되었습니다.');
      // 다시 목록을 읽음
      dispatch(loadChampionCommentsAction({ championName, page: 1 }));
      // 한줄평 입력에서 목록으로 변경
      setShowMode('list');
    }
  }, [addChampionCommentSuccess]);

  // 한줄평 취소시 목록 다시 조회
  useEffect(() => {
    if (cancelChampionCommentSuccess) {
      infoModal('성공적으로 삭제되었습니다.');
      dispatch(loadChampionCommentsAction({ championName, page: 1 }));
    }
  }, [cancelChampionCommentSuccess]);

  const onChangePaging = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const onClickChangeShowMode = useCallback(() => {
    setShowMode(showMode === 'list' ? 'edit' : 'list');
  }, [showMode]);

  return (
    <Comments>
      <SubTitle>챔피언 한줄평</SubTitle>
      {me && (
        <WriteComment onClick={onClickChangeShowMode}>
          {showMode === 'list' ? '한줄평 작성하기' : '목록보기'}
        </WriteComment>
      )}
      {showMode === 'edit' && <ChampionWriteComments championName={championName} />}
      {championCommentsList.length === 0 && showMode === 'list' && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>등록된 한줄평이 없습니다.</Empty>
      )}
      {championCommentsList.length !== 0 && showMode === 'list' && (
        <Content>
          <CommentList>
            {championCommentsList.map((comment) => {
              return <ChampionCommentsItem key={comment.commentId} comment={comment} />;
            })}
          </CommentList>
          <Paging onChange={onChangePaging} defaultCurrent={1} pageSize={3} total={totalCommentsCount} />
        </Content>
      )}
    </Comments>
  );
};

export default ChampionComments;

const Comments = styled.article`
  position: relative;
`;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const Content = styled.div`
  height: 210px;

  @media ${(props) => props.theme.tablet} {
    height: 100%;
  }
`;

const WriteComment = styled.button`
  display: block;
  margin: 0 0 0 auto;
  padding: 0.5rem;
  border: none;
  appearance: none;
  outline: none;
  font-size: 1.1rem;
  color: #339af0;
  cursor: pointer;

  & :active {
    opacity: 0.5;
  }
`;

const CommentList = styled.ul`
  height: 150px;
  overflow-y: auto;

  @media ${(props) => props.theme.tablet} {
    height: 60%;
  }
`;

const Paging = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;
