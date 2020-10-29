import React from 'react';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { PageTitle } from '../styles/layout/GlobalStyles';
import UserProfile from '../components/UserProfile';

const Login = () => {
  const { isLoggedIn } = useSelector((state) => (state.user));
  
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | { isLoggedIn ? '프로필' : '로그인'}</title>
      </Head>
      <PageTitle>{ isLoggedIn ? '프로필' : '로그인' }</PageTitle>
      { isLoggedIn ? <UserProfile /> : <LoginForm /> }
    </AppLayout>    
  );
};

export default Login;