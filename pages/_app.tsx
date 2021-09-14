import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ToastContainer } from 'react-toastify';

import {
  CssBaseline,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Footer from '../components/footer';
import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

import 'react-toastify/dist/ReactToastify.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="fav.png" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="theme-color" content="#303030" />
      <meta name="description" content="Next Timesheet" />
      <link rel="apple-touch-icon" href="fav.png" />
      <title>Next TimeSheet</title>
      <style>
        {/* eslint-disable-next-line */}
        @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
      </style>
    </Head>
    <StyledThemeProvider theme={theme}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
        <GlobalStyle />
      </MaterialThemeProvider>
    </StyledThemeProvider>
  </>
);
export default MyApp;
