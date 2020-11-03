import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import GlobalStyles from '../styles/layout/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/layout/theme';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';

const Se9oogg = ({ Component }) => {
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