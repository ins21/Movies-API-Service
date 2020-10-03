import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '@/app/components/Modal/Modal';

import './MovieCard.scss';

export const MovieCard = ({ movie, showMovieDetails }) => {
  const { title, genres, release_date, poster_path, id } = movie;
  const [currentModal, setCurrentModal] = useState(null);

  const onMovieCardClick = ({ target: { className, type } }) => {
    if (className === 'movie-card__image') showMovieDetails(id);
    if (className === 'movie-card__action') setCurrentModal(type);
  };

  return (
    <div className='movie-card' onClick={onMovieCardClick}>
      <img className='movie-card__image' src={poster_path} alt={title} />
      <p className='movie-card__title'>{title}</p>
      <p className='movie-card__year'>{release_date}</p>
      <p className='movie-card__genres'>{genres?.join(', ')}</p>
      <div className='movie-card__dots' tabIndex='1'>
        {Array(3).fill(null).map((item, index) => <span className='movie-card__dot' key={index} />)}
        <ul className='movie-card__actions'>
          <li className='movie-card__action' key='edit' type='edit'>Edit</li>
          <li className='movie-card__action' key='delete' type='delete'>Delete</li>
        </ul>
      </div>
      {
        currentModal &&
          <Modal
            currentModal={currentModal}
            onClose={() => setCurrentModal(null)}
            data={movie}
          />
      }
    </div>
  );
};

MovieCard.propTypes = {
  showMovieDetails: PropTypes.func,
  movie: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    genres: PropTypes.array,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
  }),
};
