import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Container, ContentContainer, DesktopNav, MobileFooter } from '../styles/layout/AppLayout';
import { BarChartOutlined, CrownOutlined, HomeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Router } from 'next/dist/client/router';

const AppLayout = ({ children }) => {
  const { loginDone } = useSelector((state) => state.user);

  return (
    <Container>
      {/* desktop nav */}
      <DesktopNav>
        <h1><Link href="/"><img src="/riot-logo.png" alt="logo"/></Link></h1>
        <ul>
            {
              loginDone
              ? <li><Link href="/profile"><a>프로필</a></Link></li>
              : <li><Link href="/login"><a>로그인</a></Link></li>
            }
            <li><Link href="/community"><a>커뮤니티</a></Link></li>
            <li><Link href="/champion/"><a>챔피언</a></Link></li>
            <li><Link href="/statistic"><a>전적</a></Link></li>
        </ul>
      </DesktopNav>
      {/* content */}
      <motion.div key={Router.route}
          initial="pageInitial"
          animate="pageAnimate"
          transition={{ type: 'spring', bounce: 0.25 }}
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1,
            }
          }}>
          <ContentContainer>
            {children}
          </ContentContainer>
        </motion.div>
     
      {/* mobile nav */}
      <MobileFooter>
        <ul>
          <li><Link href="/"><a><HomeOutlined /></a></Link></li>
          {
            loginDone
            ? <li><Link href="/profile"><a><UserOutlined /></a></Link></li>
            : <li><Link href="/login"><a><UserOutlined /></a></Link></li>
          }
          <li><Link href="/community"><a><MessageOutlined /></a></Link></li>
          <li><Link href="/champion"><a><CrownOutlined /></a></Link></li>
          <li><Link href="/statistic"><a><BarChartOutlined /></a></Link></li>
        </ul>
      </MobileFooter>
    </Container>
  );
};

export default AppLayout;