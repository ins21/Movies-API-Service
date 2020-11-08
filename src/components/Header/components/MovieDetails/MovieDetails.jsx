import React from 'react';
import PropTypes from 'prop-types';

import searchIcon from './assets/search-icon.png';

export const MovieDetails = ({ showSearch, movie = {} }) => {
  const { title, genres, release_date, poster_path, runtime, overview, vote_average } = movie;

  return (
    <section className='movie-details'>
      <img className='movie-details__search-img' src={searchIcon} onClick={showSearch} />
      <div className='movie-details__image-wrapper'>
        <img className='movie-details__image' src={poster_path} alt={title} />
      </div>
      <div className='movie-details__info-wrapper'>
        <h2 className='movie-details__title'>{title}
          <span className='movie-details__rating'>{vote_average || 'N/A'}</span>
        </h2>
        <p className='movie-details__genres'>{genres?.join(', ')}</p>
        <p className='movie-details__year-and-runtime'>
          <span className='movie-details__year'>{release_date?.slice(0, 4)}</span>
          <span className='movie-details__runtime'>{runtime} minutes</span>
        </p>
        <p className='movie-details__overview'>{overview}</p>
      </div>
    </section>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object,
  showSearch: PropTypes.func,
};
