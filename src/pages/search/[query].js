import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'regenerator-runtime/runtime';

import { App } from '../../components/App/App';
import { pushMoviesToStore } from '../../store/reducers/movies/movies.actions';
import { url } from '@/utils/constants';

const SearchMovie = ({ initialDataFromServer, pushMoviesToStore }) => {
  useEffect(() => {
    if (initialDataFromServer) pushMoviesToStore(initialDataFromServer);
  }, []);

  return <App />;
};

SearchMovie.getInitialProps = async ({ req, query }) => {
  if (!req) return { initialDataFromServer: null };

  const urlWithQuery = `${url}?search=${query.query}&searchBy=title`;
  const response = await fetch(urlWithQuery);
  const data = await response.json();

  return { initialDataFromServer: data?.data };
};

SearchMovie.propTypes = {
  initialDataFromServer: PropTypes.array,
  pushMoviesToStore: PropTypes.func,
};

export default connect(null, { pushMoviesToStore })(SearchMovie);
