import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { ButtonContainer, FormContainer, InputContainer } from '../styles/components/Components';
import { LoginAction } from '../reducer/user';

const LoginForm = () => {
  const dispatch = useDispatch('');
  // 로그인 성공 여부
  const { isLoginSuccess } = useSelector((state) => (state.user));

  // email
  const [email, setEmail] = useState('');
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  // password
  const [password, setPassword] = useState('');
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  // Login Submit
  const onSubmitForm = useCallback(() => {
    dispatch(LoginAction({ email: email, password: password }));
  }, [email, password]);

  // isLoginSuccess state 값이 변할 경우
  // profile page로 이동
  useEffect(() => {
    if (isLoginSuccess) {
      Router.push('/profile');
    }
  }, [isLoginSuccess]);

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
          <Button type="primary" htmlType="submit">로그인</Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default LoginForm;