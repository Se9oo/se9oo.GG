import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequestAction } from '../reducer/user';
import { UserInfo, UserNickname, UserProfileContainer } from '../styles/components/Components';
import { Button } from 'antd';

const UserProfile = () => {
  const dispatch = useDispatch('');
  const { isLogin, isLogoutLoading, me } = useSelector((state) => (state.user));

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
      <UserNickname>{me && me.nickname}</UserNickname>
      <UserInfo>
        <div>
          <dt>작성글 수</dt>
          <dd>{me && me.userPostCount}</dd>
        </div>
        <div>
          <dt>레벨</dt>
          <dd>Lv. {me && me.level}</dd>
        </div>
        <div>
          <dt>가입일</dt>
          <dd>{me && me.signupDate}</dd>
        </div>
      </UserInfo>
      <Button type="primary">비밀번호 변경하기</Button>
      <Button onClick={onClickLogoutBtn} loading={isLogoutLoading}>로그아웃</Button>
    </UserProfileContainer>
  );
};

export default UserProfile;