import React, { useCallback, useState } from 'react';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import { HomeContainer, MainLogoImg, UserSearchInput } from '../styles/pages/Pages';

const Home = () => {
  const [search, setSearch] = useState('');

  const onSearchInput = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    Router.push('/statistic');
  }, []);

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