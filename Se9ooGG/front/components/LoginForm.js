import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { ButtonContainer, FormContainer, InputContainer } from '../styles/components/LoginForm';

const LoginForm = () => {
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
    console.log(`id: ${id}, password: ${password}`);
  }, [email, password]);

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
          <Button type="primary">로그인</Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default LoginForm;