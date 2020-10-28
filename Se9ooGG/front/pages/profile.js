import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import styled from 'styled-components';

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  padding-bottom: 3rem;
`;

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 프로필</title>
      </Head>
      <PageTitle>프로필</PageTitle>
    </AppLayout>
  );
};

export default Profile;