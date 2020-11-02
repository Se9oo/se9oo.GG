import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequestAction } from '../reducer/user';
import UserProfile from '../components/UserProfile';
import AppLayout from '../components/AppLayout';
import { ProfileHeader } from '../styles/pages/Pages';
import { PageTitle } from '../styles/pages/Pages';
import { Button } from 'antd';

const Profile = () => {
  const dispatch = useDispatch('');
  const { isLogin, isLogoutLoading } = useSelector((state) => (state.user));

  const onClickLogoutBtn = useCallback(() => {
    dispatch(LogoutRequestAction());
  }, []);

  useEffect(() => {
    if (!isLogin) {
      Router.push('/login');
    }
  }, [isLogin]);

  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 프로필</title>
      </Head>
      <ProfileHeader>
        <PageTitle>프로필</PageTitle>
        <Button type="primary" onClick={onClickLogoutBtn} loading={isLogoutLoading}>로그아웃</Button>
      </ProfileHeader>
      <UserProfile />
    </AppLayout>
  );
};

export default Profile;