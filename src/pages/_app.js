import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

import ErrorBoundary from '../components/ErrorPages/ErrorBoundary/ErrorBoundary';
import { useStore } from '../store';
import '../styles/index.scss';

export default function App ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <title>Movies API service</title>
      </Head>
      <ErrorBoundary>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object,
};
