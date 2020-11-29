import React, { useCallback } from 'react';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { HomeContainer, MainLogoImg, UserSearchInput } from '../styles/pages/Pages';
import { useDispatch } from 'react-redux';
import { loadSummonerRequestAction } from '../reducer/statistic';

const Home = () => {
  const dispatch = useDispatch('');
  const [search, onSearchInput] = useInput('');

  const onSubmitForm = useCallback(() => {
    //Router.push('/statistic');
    dispatch(loadSummonerRequestAction({
      summonerName: search,
    }));
  }, [search]);

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

export default Home;