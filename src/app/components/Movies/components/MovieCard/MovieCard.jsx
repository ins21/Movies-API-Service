import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from '@/app/context';
import { Modal } from '@/app/components/Modal/Modal';

import './MovieCard.scss';

export const MovieCard = ({ movie }) => {
  const { title, genre, year, image, id } = movie;
  const [, setHeaderContext] = useContext(Context);
  const [currentModal, setCurrentModal] = useState(null);

  const onMovieCardClick = ({ target: { className, type } }) => {
    if (className === 'movie-card__image') setHeaderContext(id);
    if (className === 'movie-card__action') setCurrentModal(type);
  };

  return (
    <div className='movie-card' onClick={onMovieCardClick}>
      <img className='movie-card__image' src={image} alt={title} />
      <p className='movie-card__title'>{title}</p>
      <p className='movie-card__year'>{year}</p>
      <p className='movie-card__genre'>{genre.join(', ')}</p>
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
  movie: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    genre: PropTypes.array,
    year: PropTypes.string,
    image: PropTypes.string,
  }),
};
