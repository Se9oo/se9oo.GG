import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { loadSummonerDoneClearAction, loadSummonerRequestAction } from '../reducer/statistic';
import { Input } from 'antd';
import styled from 'styled-components';

const Home = () => {
  const dispatch = useDispatch('');
  const { summoner, loadSummonerDone } = useSelector((state) => state.statistic);
  const [search, onSearchInput] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loadSummonerRequestAction({
      summonerName: search,
    }));
  }, [search]);

  useEffect(() => {
    if (summoner && loadSummonerDone) {
      dispatch(loadSummonerDoneClearAction());
      Router.push('/statistic');
    }
  }, [summoner, loadSummonerDone]);

  return (
    <AppLayout>
      <HomeContainer>
        <MainLogoImg src="/main_logo.png" alt="Se9oo.GG Logo" />
        <UserSearchInput
          placeholder="사용자명을 입력하세요."
          onSearch={onSubmitForm}
          onChange={onSearchInput}
          value={search}
          enterButton
        />
      </HomeContainer>
    </AppLayout>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const MainLogoImg = styled.img`
  max-width: 100%;
  height: auto;
  padding: 70px 20%;
`;

const UserSearchInput = styled(Input.Search)`
  max-width: 100%;
  padding: 0 10%;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

export default Home;