import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { moviesList } from '@/data/moviesList';
import { MovieCard } from '../MovieCard/MovieCard';

import './MoviesList.scss';

export const MoviesList = ({ currentFilter, currentSortingOption }) => {
  const filteredAndSortedMovies = useMemo(() => moviesList
    .filter(({ genre }) => genre.some((item) => item.toLowerCase().includes(currentFilter)) || currentFilter === 'all')
    .sort((a, b) => {
      if (currentSortingOption === 'title') return a.title > b.title ? 1 : -1;
      return a.year > b.year ? 1 : -1;
    })
  , [currentFilter, currentSortingOption]);

  const filteredMoviesText = filteredAndSortedMovies.length.toString().slice(-1) === '1' ? 'movie found' : 'movies found';

  return (
    <section className='movies-list'>
      <p className='movies-list__found-movies'>
        <span className='movies-list__found-movies-amount'>
          {`${filteredAndSortedMovies.length} `}
        </span>
        {filteredMoviesText}
      </p>
      {
        filteredAndSortedMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
      }
      {filteredAndSortedMovies.length === 0 && 'Nothing found'}
    </section>
  );
};

MoviesList.propTypes = {
  currentFilter: PropTypes.string,
  currentSortingOption: PropTypes.string,
};
