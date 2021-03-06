import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequestAction } from '../../reducer/user';
import { errorModal } from '../CommonModal';
import ProfileImage from './ProfileImage';
import EditForm from './EditForm';
import { Button } from 'antd';
import styled from 'styled-components';

const UserProfile = () => {
  const dispatch = useDispatch('');
  const { logoutLoading, logoutDone, loadMyInfoDone, changePasswordDone, me } = useSelector((state) => state.user);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const onClickLogoutBtn = useCallback(() => {
    dispatch(LogoutRequestAction());
  }, []);

  const onClickChangePassword = useCallback(() => {
    setShowChangePassword((prevState) => !prevState);
  }, []);

  // 로그아웃
  useEffect(() => {
    if ((!me && logoutDone) || (!me && loadMyInfoDone)) {
      errorModal('로그인 정보가 없습니다.\n로그인 창으로 이동합니다.');
      Router.push('/login');
    }
  }, [me, logoutDone, loadMyInfoDone]);

  // 비밀번호 변경
  useEffect(() => {
    if (changePasswordDone) {
      setShowChangePassword(false);
    }
  }, [changePasswordDone]);

  return (
    <UserProfileContainer>
      <UserProfileContent>
        {/* <img src="/img/champion/Blitzcrank.png" alt="user-icon" /> */}
        <ProfileImage />
        <UserDetail>
          <UserNickname>{me && me.nickname}</UserNickname>
          <UserInfo>
            <div>
              <dt>작성글 수</dt>
              <dd>{me && me.postCount}개</dd>
            </div>
            <div>
              <dt>레벨</dt>
              <dd>Lv. {me && me.level}</dd>
            </div>
            <div>
              <dt>가입일</dt>
              <dd>{me && me.regDt}</dd>
            </div>
          </UserInfo>
        </UserDetail>
      </UserProfileContent>
      <ProfileButtonGroup>
        <Button type="primary" onClick={onClickChangePassword}>
          {showChangePassword ? '닫기' : '비밀번호 변경하기'}
        </Button>
        <Button onClick={onClickLogoutBtn} loading={logoutLoading}>
          로그아웃
        </Button>
      </ProfileButtonGroup>
      {showChangePassword && <EditForm />}
    </UserProfileContainer>
  );
};

const UserProfileContainer = styled.section`
  background-color: #ffffff;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid rgba(206, 212, 218, 0.5);
`;

const UserProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${(props) => props.theme.tablet} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const UserDetail = styled.div`
  width: 100%;
`;

const UserNickname = styled.strong`
  display: block;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const UserInfo = styled.dl`
  display: flex;
  width: 100%;
  font-size: 1.3rem;
  margin-bottom: 3rem;

  & div {
    flex-grow: 1;
    flex-basis: 30%;
    padding: 0 1rem;
    border-right: 1px solid #e5e5e5;
  }

  & div:last-child {
    border-right: none;
  }

  & dt {
    text-align: center;
    margin-bottom: 1rem;
  }

  & dd {
    text-align: center;
  }
`;

const ProfileButtonGroup = styled.div`
  display: block;
  width: 100%;

  & button {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    display: flex;
  }
`;

export default UserProfile;
