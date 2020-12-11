import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { LoginErrorClearRequestAction, LoginRequsetAction } from '../reducer/user';
import { errorModal } from './CommonModal';
import styled from 'styled-components';

const LoginForm = () => {
  const dispatch = useDispatch('');
  // 로그인 성공 여부
  const { loginDone, loginLoading, loginError } = useSelector((state) => (state.user));

  // email
  const [email, setEmail] = useState('');
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [email]);

  // password
  const [password, setPassword] = useState('');
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [password]);

  // Login Submit
  const onSubmitForm = useCallback(() => {
    if (!email) {
      errorModal(`'이메일' 란을 채워주세요.`);
      return;
    }

    if (!password) {
      errorModal(`'비밀번호' 란을 채워주세요.`);
      return;
    }

    dispatch(LoginRequsetAction({email, password}));
  }, [email, password]);

  // isLoginSuccess state 값이 변할 경우
  // profile page로 이동
  useEffect(() => {
    if (loginDone) {
      Router.push('/profile');
    }
  }, [loginDone]);

  useEffect(() => {
    if (loginError) {
      errorModal(loginError);
      dispatch(LoginErrorClearRequestAction());
      return;
    }
  }, [loginError]);

  return (
    <>
      <FormContainer onFinish={onSubmitForm}>
        {/* email */}
        <InputContainer>
          <label htmlFor="user-email">이메일</label>
          <Input 
            placeholder="이메일을 입력하세요."
            type="email"
            name="user-email"
            value={email}
            onChange={onChangeEmail}
          />
        </InputContainer>

        {/* password */}
        <InputContainer>
          <label htmlFor="user-password">비밀번호</label>
          <Input.Password
            placeholder="비밀번호를 입력하세요."
            name="user-password"
            value={password}
            onChange={onChangePassword}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            visibilityToggle
          />
        </InputContainer>

        {/* button */}
        <ButtonContainer>
          <Button><Link href="/signup"><a>회원가입</a></Link></Button>
          <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export const FormContainer = styled(Form)`
  padding: 3rem 0;
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;

  & label {
    display: block;
    padding-bottom: .5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default LoginForm;