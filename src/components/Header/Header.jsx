import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';

import { Search } from './components/Search/Search';
import { AppTitle } from '@/components/AppTitle/AppTitle';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { showSearch } from '@/store/reducers/header/header.actions';
import { fetchMovies, clearMoviesList } from '@/store/reducers/movies/movies.actions';

const Header = ({ headerContent, showSearch, currentMovie, fetchMovies, clearMoviesList }) => {
  const router = useRouter();
  const { query: { query } } = router;

  useEffect(() => {
    if (headerContent === 'movie-details') {
      Router.push(`/film/${currentMovie?.id}`);
    } else if (!query) {
      Router.push('/');
    }
  }, [headerContent, currentMovie]);

  return (
    <header className='container header'>
      <h1 className='header__title'>
        <AppTitle />
      </h1>
      {headerContent === 'movie-details'
        ? <MovieDetails movie={currentMovie} showSearch={showSearch} />
        : <Search fetchMovies={fetchMovies} clearMoviesList={clearMoviesList} />}
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
