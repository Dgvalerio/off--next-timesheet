import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
  CssBaseline,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <StyledThemeProvider theme={theme}>
    <MaterialThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <ToastContainer />
      <GlobalStyle />
    </MaterialThemeProvider>
  </StyledThemeProvider>
);
export default MyApp;
