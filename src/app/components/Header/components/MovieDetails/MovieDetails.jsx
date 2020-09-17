import React from 'react';
import PropTypes from 'prop-types';

import { moviesList } from '@/data/moviesList';

import searchIcon from './assets/search-icon.svg';
import './MovieDetails.scss';

export const MovieDetails = ({ movieId, setHeaderContext }) => {
  const movie = moviesList.find(item => item.id === movieId);
  const { title, genre, year, image, runtime, overview } = movie;

  return (
    <section className='movie-details'>
      <img className='movie-details__search-img' src={searchIcon} onClick={() => setHeaderContext('search')} />
      <div className='movie-details__image-wrapper'>
        <img className='movie-details__image' src={image} alt={title} />
      </div>
      <div className='movie-details__info-wrapper'>
        <h2 className='movie-details__title'>{title}</h2>
        <p className='movie-details__genre'>{genre.join(', ')}</p>
        <p className='movie-details__year-and-runtime'>
          <span className='movie-details__year'>{year.slice(0, 4)}</span>
          <span className='movie-details__runtime'>{runtime}</span>
        </p>
        <p className='movie-details__overview'>{overview}</p>
      </div>
    </section>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.string,
  setHeaderContext: PropTypes.func,
};
