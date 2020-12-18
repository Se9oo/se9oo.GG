import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSummonerDoneClearAction, loadSummonerRequestAction } from '../reducer/statistic';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import SummonerRankItem from '../components/SummonerRankItem';
import SummonerMostChampionItem from '../components/SummonerMostChampionItem';
import SummonerMatchItem from '../components/SummonerMatchItem';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { errorModal } from '../components/CommonModal';
import useInput from '../hooks/useInput';

const Statistic = () => {
  const dispatch = useDispatch('');
  const { summoner, loadSummonerDone } = useSelector((state) => state.statistic);
  const [search, onSearchInput] = useInput('');

  // 예외처리
  useEffect(() => {
    if (Object.keys(summoner).length == 0) {
      errorModal(`사용자를 검색해주세요.\n메인 화면으로 이동합니다.`);
      Router.push('/');
    }
  }, [summoner])

  // 사용자 전적 검색 후 loadSummonerDone state 초기화
  useEffect(() => {
    if (loadSummonerDone) {
      dispatch(loadSummonerDoneClearAction());
    }
  }, [loadSummonerDone])

  // 사용자 전적 검색
  const onSubmitInput = useCallback(() => {
    dispatch(loadSummonerRequestAction({
      summonerName: search
    }));
  }, [search])

  // 전적 새로고침
  const onClickRefresh = useCallback(() => {
    dispatch(loadSummonerRequestAction({
      summonerName: summoner.summonerName
    }));
  }, [summoner]);

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
            <Button type="primary">인게임 정보</Button>
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

const UserSearchInput = styled(Input.Search)`
  max-width: 100%;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

export const Summoner = styled.div`
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

export const SummonerRank = styled.div`
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

export const SummonerMostChampion = styled.div`
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

export default Statistic;