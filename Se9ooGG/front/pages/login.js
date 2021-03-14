import React from 'react';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/user/LoginForm';
import Head from 'next/head';

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