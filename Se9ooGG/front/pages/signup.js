import React from 'react';
import Head from 'next/head';
import SignUpForm from '../components/user/SignUpForm';
import AppLayout from '../components/AppLayout';

const SignUp = () => {
  return (
    <AppLayout>
      <Head>
        <title>se9oo.GG | 회원가입</title>
      </Head>
      <SignUpForm />
    </AppLayout>
  );
};

export default SignUp;
