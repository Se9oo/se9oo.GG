import React, { useCallback } from 'react';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { errorModal } from '../components/CommonModal';
import { Input } from 'antd';
import styled from 'styled-components';

const Home = () => {
  const [search, onSearchInput] = useInput('');

  const onSubmitForm = useCallback(() => {
    if (!search) {
      return errorModal('사용자명을 입력하세요.');
    }

    Router.push({
      pathname: '/statistic',
      query: `summonerName=${search.replace(/ /gi, '+')}`,
    });
  }, [search])

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