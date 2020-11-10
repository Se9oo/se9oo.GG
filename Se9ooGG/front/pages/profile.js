import React from 'react';
import Head from 'next/head';
import UserProfile from '../components/UserProfile';
import AppLayout from '../components/AppLayout';
import { ProfileHeader } from '../styles/pages/Pages';
import { PageTitle } from '../styles/pages/Pages';

const Profile = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 프로필</title>
      </Head>
      <UserProfile />
    </AppLayout>
  );
};

export default Profile;