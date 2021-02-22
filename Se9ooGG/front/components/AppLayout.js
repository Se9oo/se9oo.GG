import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { CrownOutlined, HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Container>
      {/* desktop nav */}
      <DesktopNav>
        <h1><Link href="/"><img src="/nav-logo.png" alt="logo"/></Link></h1>
        <ul>
            {
              me
              ? <li><Link href="/profile"><a>프로필</a></Link></li>
              : <li><Link href="/login"><a>로그인</a></Link></li>
            }
            <li><Link href="/community"><a>커뮤니티</a></Link></li>
            <li><Link href="/champion/"><a>챔피언</a></Link></li>
        </ul>
      </DesktopNav>
      {/* content */}
        <ContentContainer>
          {children}
        </ContentContainer>
      {/* mobile nav */}
      <MobileFooter>
        <ul>
          <li><Link href="/"><a><HomeOutlined /></a></Link></li>
          {
            me
            ? <li><Link href="/profile"><a><UserOutlined /></a></Link></li>
            : <li><Link href="/login"><a><UserOutlined /></a></Link></li>
          }
          <li><Link href="/community"><a><MessageOutlined /></a></Link></li>
          <li><Link href="/champion"><a><CrownOutlined /></a></Link></li>
        </ul>
      </MobileFooter>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  @media ${props => props.theme.laptop} {
    max-width: 980px;
    margin: 0 auto;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #ffffff;
  z-index: 9999;

  & h1 {
    width: 20%;
    font-size: 2rem;
  }

  & img {
    width: 4rem;
    cursor: pointer;
  }

  & button {
    justify-content: flex-end;
  }

  & ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 80%;
  }

  & li {
    padding: 0 2rem;
  }

  @media ${props => props.theme.laptop} {
    display: flex;
  }
`;

const ContentContainer = styled.section`
  display: block;
  padding: 10px 10px 80px;

  @media ${props => props.theme.tablet} {
    padding: 10px 10px 100px;
  }

  @media ${props => props.theme.laptop} {
    padding: 80px 1rem 1rem;
  }
`;

const MobileFooter = styled.footer`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #e5e5e5;
    padding: 1rem 0;
    z-index: 9999;
  }

  & li {
    width: 20%;
    text-align: center;
  }

  & a {
    display: block;
    padding: 1.5rem 1rem;
    font-size: 2rem;
  }

  @media ${props => props.theme.laptop} {
    display:none;
  }
`;

export default AppLayout;