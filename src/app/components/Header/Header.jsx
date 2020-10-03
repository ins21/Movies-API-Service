import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { Search } from './components/Search/Search';
import { AppTitle } from '@/app/components/AppTitle/AppTitle';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { showSearch } from '@/store/reducers/header/header.actions';
import { fetchMovies, clearMoviesList } from '@/store/reducers/movies/movies.actions';

import './Header.scss';

const Header = ({ headerContent, showSearch, currentMovie, fetchMovies, clearMoviesList }) => {
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    if (headerContent === 'search' && !pathname.includes('/search/')) {
      history.push('/search');
    } else if (headerContent === 'movie-details') {
      history.push(`/film/${currentMovie?.id}`);
    }
  }, [headerContent, currentMovie]);

  return (
    <header className='container header'>
      <h1 className='header__title'>
        <AppTitle />
      </h1>
      <Route path='/search'>
        <Search fetchMovies={fetchMovies} clearMoviesList={clearMoviesList} />
      </Route>
      <Route path='/film'>
        <MovieDetails movie={currentMovie} showSearch={showSearch} />
      </Route>
    </header>
  );
};

Header.propTypes = {
  headerContent: PropTypes.string,
  currentMovie: PropTypes.object,
  showSearch: PropTypes.func,
  fetchMovies: PropTypes.func,
  clearMoviesList: PropTypes.func,
};

const mapStateToProps = ({ header, movies }) => ({
  headerContent: header.headerContent,
  currentMovie: movies.moviesList?.find(item => item.id === header.currentMovieId)
});

const mapDispatchToProps = { showSearch, fetchMovies, clearMoviesList };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
