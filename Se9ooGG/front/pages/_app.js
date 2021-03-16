import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { ThemeProvider } from 'styled-components';
import wrapper from '../store/configureStore';
import 'antd/dist/antd.css';
import { LoadMyInfoRequestAction } from '../reducer/user';

const Se9oogg = ({ Component }) => {
  const dispatch = useDispatch('');

  // 새로고침 할 때 user 정보 가져오기
  useEffect(() => {
    dispatch(LoadMyInfoRequestAction());
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width,
           maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
          <title>se9oo.GG</title>
        </Head>
        <GlobalStyles />
        <Component />
      </ThemeProvider>
    </>
  );
};

Se9oogg.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Se9oogg);

const GlobalStyles = createGlobalStyle`
  ${reset}
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('/fonts/GmarketSansTTFMedium.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 10px;

    @media ${(props) => props.theme.tablet} {
      font-size: 12px;
    } 
  }

  body {
    background-color: #fafafa;
  }

  body, input, a, ol, ul, li, button {
    font-family: 'GmarketSansMedium', 'Sans-serif' !important;
  }

  #__next {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  a {
    text-decoration:none;
    color:inherit;
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
  }

  input, button {
    background-color: transparent;
  }

  .ant-menu-item {
    font-weight: 600;
  }

  .ant-menu-horizontal > .ant-menu-item a {
    color: #ffffff;
  }

  // antd comment inner padding
  .ant-comment-inner {
    padding: 1rem 0;
  }

  .ant-comment-content-detail {

    & span {
      display: block;
      margin-bottom: .5rem;
    }
  }
`;

const size = {
  mobile: '479px',
  tablet: '767px',
  laptop: '980px',
  desktop: '1024px',
};

const theme = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};
