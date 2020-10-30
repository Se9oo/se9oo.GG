import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import { ButtonContainer, ErrorMessage, InputContainer } from '../styles/components/Components';
import { Button, Form, Input } from 'antd';

const SignUpForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordError, setPasswordError] = useState(false);
  // 비밀번호
  const [password, setPassword] = useState('');
  // 비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState('');
  
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setPasswordError(passwordCheck !== e.target.value);
  }, [passwordCheck]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(password !== e.target.value);
  }, [password]);

  const onSubmitForm = useCallback(() => {
    
  }, []);
  
  return (
    <>
      <h2>회원가입</h2>
      <Form onFinish={onSubmitForm}>
        <InputContainer>
          <label htmlFor="user-email">이메일</label>
          <Input 
            type="email"
            name="user-email"
            placeholder="이메일"
            value={email}
            onChange={onChangeEmail}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="user-nickname">닉네임</label>
          <Input 
            type="text"
            name="user-nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={onChangeNickname}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="user-password">비밀번호</label>
          <Input
            type="password"
            name="user-password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="user-passwordCheck">비밀번호 확인</label>
          <Input
            type="password"
            name="user-passwordCheck"
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </InputContainer>
        { passwordError && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage> }
        <ButtonContainer>
          <Button type="primary">가입하기</Button>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default SignUpForm;