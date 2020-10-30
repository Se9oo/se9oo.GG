import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Container, ContentContainer, DesktopNav, MobileFooter } from '../styles/layout/AppLayout';
import { BarChartOutlined, CrownOutlined, HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <Container>
      {/* desktop nav */}
      <DesktopNav>
        <h1><Link href="/"><a>se9oo.GG</a></Link></h1>
        <ul>
            {
              isLoggedIn
              ? <li><Link href="/profile"><a>프로필</a></Link></li>
              : <li><Link href="/login"><a>로그인</a></Link></li>
            }
            <li><Link href="/champion"><a>챔피언</a></Link></li>
            <li><Link href="/statistic"><a>전적</a></Link></li>
            <li><Link href="/community"><a>커뮤니티</a></Link></li>
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
            isLoggedIn
            ? <li><Link href="/profile"><a><UserOutlined /></a></Link></li>
            : <li><Link href="/login"><a><UserOutlined /></a></Link></li>
          }
          <li><Link href="/champion"><a><CrownOutlined /></a></Link></li>
          <li><Link href="/statistic"><a><BarChartOutlined /></a></Link></li>
          <li><Link href="/community"><a><MessageOutlined /></a></Link></li>
        </ul>
      </MobileFooter>
    </Container>
  );
};

export default AppLayout;