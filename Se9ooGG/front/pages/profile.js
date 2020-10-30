import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAction } from '../reducer/user';
import AppLayout from '../components/AppLayout';
import { ProfileHeader } from '../styles/pages/Pages';
import { PageTitle } from '../styles/pages/Pages';
import { Button } from 'antd';

const Profile = () => {
  const dispatch = useDispatch('');
  const { isLogoutSuccess } = useSelector((state) => (state.user));

  const onClickLogoutBtn = useCallback(() => {
    dispatch(LogoutAction());
  }, []);

  useEffect(() => {
    if (isLogoutSuccess) {
      Router.push('/login');
    }
  }, [isLogoutSuccess]);

  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 프로필</title>
      </Head>
      <ProfileHeader>
        <PageTitle>프로필</PageTitle>
        <Button type="primary" onClick={onClickLogoutBtn}>로그아웃</Button>
      </ProfileHeader>
    </AppLayout>
  );
};

export default Profile;