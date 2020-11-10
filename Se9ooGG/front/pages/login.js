import React from 'react';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import Head from 'next/head';
import { PageTitle } from '../styles/pages/Pages';

const Login = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 로그인</title>
      </Head>
      <LoginForm />
    </AppLayout>    
  );
};

export default Login;