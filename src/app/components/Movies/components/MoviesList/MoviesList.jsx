import React from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../MovieCard/MovieCard';

import './MoviesList.scss';

export const MoviesList = ({ moviesList, showMovieDetails }) => {
  const filteredMoviesText = moviesList?.length.toString().slice(-1) === '1' ? 'movie found' : 'movies found';

  return (
    <section className='movies-list'>
      <p className='movies-list__found-movies'>
        <span className='movies-list__found-movies-amount'>
          {`${moviesList?.length} `}
        </span>
        {filteredMoviesText}
      </p>
      {
        moviesList?.map(movie => <MovieCard key={movie.id} movie={movie} showMovieDetails={showMovieDetails} />)
      }
      {moviesList?.length === 0 && 'Nothing found'}
    </section>
  );
};

MoviesList.propTypes = {
  moviesList: PropTypes.array,
  showMovieDetails: PropTypes.func,
};
