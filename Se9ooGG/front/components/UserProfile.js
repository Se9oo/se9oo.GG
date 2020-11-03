import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequestAction } from '../reducer/user';
import { UserInfo, UserNickname, UserProfileContainer } from '../styles/components/Components';
import { Button } from 'antd';

const UserProfile = () => {
  const dispatch = useDispatch('');
  const { isLogin, isLogoutLoading } = useSelector((state) => (state.user));

  const onClickLogoutBtn = useCallback(() => {
    dispatch(LogoutRequestAction());
  }, []);

  useEffect(() => {
    if (!isLogin) {
      Router.push('/login');
    }
  }, [isLogin]);

  return (
    <UserProfileContainer>
      <img src="/img/champion/Blitzcrank.png" alt="user-icon" />
      <UserNickname>세구</UserNickname>
      <UserInfo>
        <div>
          <dt>작성글 수</dt>
          <dd>20</dd>
        </div>
        <div>
          <dt>레벨</dt>
          <dd>Lv. 2</dd>
        </div>
        <div>
          <dt>가입일</dt>
          <dd>2020.11.02</dd>
        </div>
      </UserInfo>
      <Button type="primary">비밀번호 변경하기</Button>
      <Button onClick={onClickLogoutBtn} loading={isLogoutLoading}>로그아웃</Button>
    </UserProfileContainer>
  );
};

export default UserProfile;