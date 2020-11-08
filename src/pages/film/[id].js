import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'regenerator-runtime/runtime';

import { App } from '../../components/App/App';
import { pushMoviesToStore } from '../../store/reducers/movies/movies.actions';
import { url } from '@/utils/constants';

const FilmDetails = ({ initialDataFromServer, pushMoviesToStore }) => {
  useEffect(() => {
    if (initialDataFromServer) pushMoviesToStore(initialDataFromServer);
  }, []);

  return <App />;
};

FilmDetails.getInitialProps = async ({ req }) => {
  if (!req) return { initialDataFromServer: null };

  const response = await fetch(url);
  const data = await response.json();

  return { initialDataFromServer: data?.data };
};

FilmDetails.propTypes = {
  initialDataFromServer: PropTypes.array,
  pushMoviesToStore: PropTypes.func,
};

export default connect(null, { pushMoviesToStore })(FilmDetails);
