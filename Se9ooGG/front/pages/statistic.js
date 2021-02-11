import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadMyInfoRequestAction } from '../reducer/user';
import { 
    loadSummonerDoneClearAction, loadSummonerErrorClearAction
  , loadSummonerRequestAction, loadSummonerInGameRequestAction, loadSummonerInGameErrorClearAction
 } from '../reducer/statistic';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import SummonerRankItem from '../components/SummonerRankItem';
import SummonerMostChampionItem from '../components/SummonerMostChampionItem';
import SummonerMatchItem from '../components/SummonerMatchItem';
import { errorModal } from '../components/CommonModal';
import { Button, Input } from 'antd';
import styled from 'styled-components';

const Statistic = () => {
  const dispatch = useDispatch('');
  const { summoner, loadSummonerDone, loadSummonerError, loadSummonerInGameError } = useSelector((state) => state.statistic);
  const [search, onSearchInput] = useInput('');

  // 소환사 검색 중 에러가 존재하는 경우
  useEffect(() => {
    if (loadSummonerError !== null) {
      // 에러 모달
      errorModal(loadSummonerError);
      // 에러 내용 초기화
      dispatch(loadSummonerErrorClearAction());
      // index 페이지로 이동
      Router.push('/');
    }
  }, [loadSummonerError])

  // 사용자 전적 검색 후 loadSummonerDone state 초기화
  useEffect(() => {
    if (loadSummonerDone) {
      dispatch(loadSummonerDoneClearAction());
    }
  }, [loadSummonerDone])

  // 사용자 전적 검색
  const onSubmitInput = useCallback(() => {
    if (!search) {
      return errorModal('사용자명을 입력하세요.');
    }

    Router.push({
      pathname: '/statistic',
      query: `summonerName=${search.replace(/ /gi, '+')}`,
    });
  }, [search]);

  // 전적 새로고침
  const onClickRefresh = useCallback(() => {
    dispatch(loadSummonerRequestAction({
      summonerName: summoner.summonerName
    }));
  }, [summoner]);

  // 인게임 정보
  const onClickInGame = useCallback(() => {
    dispatch(loadSummonerInGameRequestAction({
      summonerName: summoner.summonerName
    }));
  }, [summoner]);

  // 인게임 정보 없는 경우 메세지 처리
  useEffect(() => {
    if (loadSummonerInGameError !== null) {
      errorModal(loadSummonerInGameError);
      dispatch(loadSummonerInGameErrorClearAction());
    }
  }, [loadSummonerInGameError]);

  return (
    <AppLayout>
      {
        Object.keys(summoner).length != 0
        ?
        <>
          <UserSearchInput 
            placeholder="사용자명을 입력하세요."
            onSearch={onSubmitInput}
            onChange={onSearchInput}
            value={search}
            enterButton
          />
          <Summoner>
            <img src={`./img/profileicon/${summoner.profileIconId}.png`} alt="summoner-profile-icon"/>
            <strong>{summoner.summonerName}</strong>
            <Button onClick={onClickRefresh}>전적 새로고침</Button>
            <Button type="primary" onClick={onClickInGame}>인게임 정보</Button>
          </Summoner>
          <SummonerRank>
            <ul>
              {
                summoner.tier 
                ? summoner.tier.map((rank) => <SummonerRankItem key={rank.queueType} rank={rank}/>)
                : null
              }
            </ul>
          </SummonerRank>
          <SummonerMostChampion>
            <ul>
              {
                summoner.proficiencyTop3
                ? summoner.proficiencyTop3.map((most) => <SummonerMostChampionItem key={most.championId} most={most} />)
                : null
              }
            </ul>
          </SummonerMostChampion>
          <ul>
            {
              summoner.match
              ? summoner.match.map((match) => <SummonerMatchItem key={match.gameId} match={match} />)
              : null
            }
          </ul>
        </>
        : null
      }
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';

  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  if (context.query.summonerName) {
    context.store.dispatch(loadSummonerRequestAction({
      summonerName: context.query.summonerName,
    }));
  }

  context.store.dispatch(LoadMyInfoRequestAction());

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  //console.log('흐에');
//  console.log(context.store.getState().statistic);
});

export default Statistic;

const UserSearchInput = styled(Input.Search)`
  max-width: 100%;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

const Summoner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & img {
    width: 30%;
    height: 30%;
    border-radius: 999px;
  }

  & strong {
    display: block;
    font-size: 2rem;
    margin: 1rem 0;
  }

  & button {
    width: 100%;
  }
`

const SummonerRank = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & ul {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SummonerMostChampion = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, .5);

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;