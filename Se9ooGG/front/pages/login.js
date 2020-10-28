import React from 'react';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import styled from 'styled-components';
import Head from 'next/head';

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  padding-bottom: 3rem;
`;

const Login = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 로그인</title>
      </Head>
      <PageTitle>로그인</PageTitle>
      <LoginForm />
    </AppLayout>    
  );
};

export default Login;