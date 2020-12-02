import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import GlobalStyles from '../styles/layout/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/layout/theme';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';
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
          <meta charSet="utf-8"/>
          <meta name="viewport" 
          content="initial-scale=1.0, width=device-width,
           maximum-scale=1, minimum-scale=1, user-scalable=no" />
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

export default wrapper.withRedux(withReduxSaga(Se9oogg));