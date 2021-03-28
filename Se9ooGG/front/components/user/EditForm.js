import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'next/router';
import { ChangePasswordRequestAction } from '../../reducer/user';
import CommonModal, { errorModal } from '../CommonModal';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

const EditForm = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);

  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  // 비밀번호
  const [password, setPassword] = useState('');
  // 비밀번호 확인
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setPasswordError(passwordCheck !== e.target.value);
    },
    [passwordCheck]
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(password !== e.target.value);
    },
    [password]
  );

  // 비밀번호 변경 modal - ok버튼 클릭
  const onOkModal = useCallback(() => {
    if (!me) {
      errorModal('로그인 정보가 없습니다. 다시 로그인 해주세요.');
      Router.push('/login');
    }

    if (!password) {
      errorModal(`'변경 비밀번호' 란을 채워주세요.`);
      return;
    }

    if (!passwordCheck) {
      errorModal(`'변경 비밀번호 확인' 란을 채워주세요.`);
      return;
    }

    dispatch(ChangePasswordRequestAction({ email: me.email, password }));
    setShowModal(false);
  }, [me, password, passwordCheck]);

  // 비밀번호 변경 modal - cancel 버튼 클릭
  const onCancelModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (!password) {
      errorModal(`'변경 비밀번호' 란을 채워주세요.`);
      return;
    }

    if (!passwordCheck) {
      errorModal(`'변경 비밀번호 확인' 란을 채워주세요.`);
      return;
    }

    if (password !== passwordCheck) {
      errorModal(`비밀번호가 다릅니다.`);
      return;
    }

    if (password && passwordCheck) {
      setModalContent({
        title: '비밀번호 변경',
        onOk: onOkModal,
        onCancel: onCancelModal,
        content: '변경 하시겠습니까?',
      });
      setShowModal(true);
    }
  }, [password, passwordCheck, onOkModal]);

  return (
    <>
      <FormContainer onFinish={onSubmitForm}>
        <InputContainer>
          <label htmlFor="user-password">변경 비밀번호</label>
          <Input
            type="password"
            name="user-password"
            placeholder="변경 비밀번호"
            value={password}
            onChange={onChangePassword}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="user-passwordCheck">변경 비밀번호 확인</label>
          <Input
            type="password"
            name="user-passwordCheck"
            placeholder="변경 비밀번호 확인"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </InputContainer>
        {passwordError && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
        <Button type="primary" htmlType="submit">
          변경
        </Button>
      </FormContainer>
      <CommonModal modalContent={modalContent} visible={showModal} />
    </>
  );
};

export default EditForm;

const FormContainer = styled(Form)`
  margin-top: 1rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;

  & label {
    display: block;
    padding-bottom: 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  color: #e03131;
`;
