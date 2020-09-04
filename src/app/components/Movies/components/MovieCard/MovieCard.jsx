import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@/app/components/Modal/Modal';

import './MovieCard.scss';

export const MovieCard = ({ movie }) => {
  const { title, genre, year, image } = movie;
  const [currentModal, setCurrentModal] = useState(false);

  return (
    <div className='movie-card'>
      <img className='movie-card__image' src={image} alt={title} />
      <p className='movie-card__title'>{title}</p>
      <p className='movie-card__year'>{year}</p>
      <p className='movie-card__genre'>{genre.join(', ')}</p>
      <div className='movie-card__dots' tabIndex='1'>
        {Array(3).fill(null).map((item, index) => <span className='movie-card__dot' key={index} />)}
        <ul className='movie-card__actions'>
          <li className='movie-card__action' key='edit' onClick={() => setCurrentModal('edit')}>Edit</li>
          <li className='movie-card__action' key='delete' onClick={() => setCurrentModal('delete')}>Delete</li>
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
    genre: PropTypes.array,
    year: PropTypes.string,
    image: PropTypes.string,
  }),
};
