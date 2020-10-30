import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { PageTitle } from '../styles/pages/Pages';
import { Button } from 'antd';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 프로필</title>
      </Head>
      <ProfileContainer>
        <PageTitle>프로필</PageTitle>
        <Button type="primary">로그아웃</Button>
      </ProfileContainer>
    </AppLayout>
  );
};

export default Profile;