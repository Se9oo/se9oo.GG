import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import CommonModal, { errorModal, infoModal } from './CommonModal';
import { ButtonContainer, ErrorMessage, InputContainer } from '../styles/components/Components';
import { Button, Form, Input } from 'antd';
import { SignUpDoneClearRequestAction, SignUpRequestAction } from '../reducer/user';

const SignUpForm = () => {
  const dispatch = useDispatch('');
  const { signUpLoading, signUpDone, signUpError } = useSelector((state) => (state.user));
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordError, setPasswordError] = useState(false);
  const [modalContent, setModalContent] = useState('');

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

  // 회원가입 성공
  useEffect(() => {
    if (signUpDone) {
      infoModal('성공적으로 가입됐습니다.');
      Router.push('/login');
      dispatch(SignUpDoneClearRequestAction());
    }
  }, [signUpDone]);

  // 회원가입 오류
  useEffect(() => {
    if (signUpError) {
      alert('signUpError');
    }
  }, [signUpError]);

  // 회원가입 버튼 클릭
  const onSubmitForm = useCallback(() => {
    if (!email) {
      errorModal(`'이메일' 란을 채워주세요.`);
      return;
    }

    if (!nickname) {
      errorModal(`'닉네임' 란을 채워주세요.`);
      return;
    }

    if (!password) {
      errorModal(`'비밀번호' 란을 채워주세요.`);
      return;
    }

    if (!passwordCheck) {
      errorModal(`'비밀번호 확인' 란을 채워주세요.`);
      return;
    }

    if (password !== passwordCheck) {
      errorModal(`'비밀번호가 다릅니다.'`);
      return;
    }

    if (password && passwordCheck && (password === passwordCheck)) {
      setModalContent({
        title: '회원가입',
        onOk: onOkModal,
        onCancel: onCancelModal,
        content:'가입 하시겠습니까?'
      });
      setShowModal(true);
    }
  }, [email, nickname, password, passwordCheck]);

  // 회원가입 모달 - ok버튼 클릭
  const onOkModal = useCallback(() => {
    dispatch(SignUpRequestAction({ email, password, nickname }));
    setShowModal(false);
  }, [email, password, nickname]);
  // 회원가입 모달 - cancel 버튼 클릭
  const onCancelModal = useCallback(() => {
    setShowModal(false);
  }, []);
  
  return (
    <>
      <h2>회원가입</h2>
      <Form onFinish={onSubmitForm}>
        <InputContainer>
          <label htmlFor="user-email">이메일</label>
          <Input 
            type="text"
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
          <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
        </ButtonContainer>
      </Form>
      <CommonModal
        modalContent={modalContent}
        visible={showModal}
      />
    </>
  );
};

export default SignUpForm;