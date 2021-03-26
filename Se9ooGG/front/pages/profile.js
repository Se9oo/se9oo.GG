import React from 'react';
import Head from 'next/head';
import UserProfile from '../components/user/UserProfile';
import MyPost from '../components/user/MyPost';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 프로필</title>
      </Head>
      <UserProfile />
      <MyPost />
    </AppLayout>
  );
};

export default Profile;
