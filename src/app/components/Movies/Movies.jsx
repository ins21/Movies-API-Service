import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { moviesFilters, moviesSortingOptions } from '@/utils/constants';
import { MoviesFilters } from './components/MoviesFilters/MoviesFilters';
import { MoviesList } from './components/MoviesList/MoviesList';
import { showMovieDetails } from '@/store/reducers/header/header.actions';
import { fetchMovies, setFilter, setSortingOption } from '@/store/reducers/movies/movies.actions';
import { filteredAndSortedMovies } from '@/utils/selectors';

import './Movies.scss';

const Movies = props => {
  const { filter, sortingOption, showMovieDetails, fetchMovies, filteredAndSortedMovies, setFilter, setSortingOption } = props;

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className='container movies'>
      <MoviesFilters
        filters={moviesFilters}
        sortingOptions={moviesSortingOptions}
        currentFilter={filter}
        currentSortingOption={sortingOption}
        setCurrentFilter={setFilter}
        setCurrentSortingOption={setSortingOption}
      />
      <MoviesList
        moviesList={filteredAndSortedMovies}
        showMovieDetails={showMovieDetails}
      />
    </main>
  );
};

Movies.propTypes = {
  filter: PropTypes.string,
  sortingOption: PropTypes.string,
  fetchMovies: PropTypes.func,
  showMovieDetails: PropTypes.func,
  filteredAndSortedMovies: PropTypes.array,
  setFilter: PropTypes.func,
  setSortingOption: PropTypes.func,
};

const mapStateToProps = state => ({
  movies: state.movies.moviesList,
  filteredAndSortedMovies: filteredAndSortedMovies(state),
  filter: state.movies.filter,
  sortingOption: state.movies.sortingOption,
});

const mapDispatchToProps = { showMovieDetails, fetchMovies, setFilter, setSortingOption };

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
