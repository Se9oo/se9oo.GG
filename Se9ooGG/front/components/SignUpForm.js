import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import { ButtonContainer, ErrorMessage, InputContainer } from '../styles/components/Components';
import { Button, Form, Input, Modal } from 'antd';

const SignUpForm = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordError, setPasswordError] = useState(false);
  // 회원가입 modal 노출 여부
  const [showModal, setShowModal] = useState(false);

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

  // 회원가입 버튼 클릭
  const onClickSignupBtn = useCallback(() => {
    setShowModal(true);
  }, []);
  // 회원가입 모달 - ok버튼 클릭
  const onOkModal = useCallback(() => {
    setShowModal(false);
  }, []);
  // 회원가입 모달 - cancel 버튼 클릭
  const onCancelModal = useCallback(() => {
    setShowModal(false);
  }, []);

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
          <Button type="primary" onClick={onClickSignupBtn}>가입하기</Button>
        </ButtonContainer>
      </Form>
      <Modal
        title="회원가입"
        visible={showModal}
        onOk={onOkModal}
        onCancel={onCancelModal}
      >
        <p>가입 하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default SignUpForm;