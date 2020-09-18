import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Search } from './components/Search/Search';
import { AppTitle } from '@/app/components/AppTitle/AppTitle';
import { MovieDetails } from './components/MovieDetails/MovieDetails';
import { showSearch } from '@/store/reducers/header/header.actions';

import './Header.scss';

const Header = ({ headerContent, showSearch, currentMovie }) => (
  <header className='container header'>
    <h1 className='header__title'>
      <AppTitle />
    </h1>
    {
      headerContent === 'search' || !currentMovie
        ? <Search />
        : <MovieDetails movie={currentMovie} showSearch={showSearch} />
    }
  </header>
);

Header.propTypes = {
  headerContent: PropTypes.string,
  currentMovie: PropTypes.object,
  showSearch: PropTypes.func,
};

const mapStateToProps = ({ header, movies }) => ({
  headerContent: header.headerContent,
  currentMovie: movies.moviesList?.find(item => item.id === header.currentMovieId)
});

const mapDispatchToProps = { showSearch };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
