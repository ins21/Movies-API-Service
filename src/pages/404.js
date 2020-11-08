import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'regenerator-runtime/runtime';

import NotFoundPage from '../components/ErrorPages/NotFoundPage/NotFoundPage';
import { pushMoviesToStore } from '../store/reducers/movies/movies.actions';
import { url } from '@/utils/constants';

const ErrorPage = ({ pushMoviesToStore }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      pushMoviesToStore(data?.data);
    };

    fetchData();
  }, []);

  return <NotFoundPage />;
};

ErrorPage.propTypes = {
  pushMoviesToStore: PropTypes.func,
};

export default connect(null, { pushMoviesToStore })(ErrorPage);
