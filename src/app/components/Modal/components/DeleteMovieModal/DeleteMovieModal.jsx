import React from 'react';
import PropTypes from 'prop-types';

import { ModalButton } from '../ModalButton/ModalButton';

export const DeleteMovieModal = ({ onClose }) => (
  <section className='modal'>
    <h2 className='modal__title'>Delete Movie</h2>
    <p className='modal__description'>Are you sure you want to delete this movie?</p>
    <div className='modal__button-wrapper'>
      <ModalButton type='primary' text='confirm' onClick={onClose} />
    </div>
    <span className='modal__close' onClick={onClose} />
  </section>
);

DeleteMovieModal.propTypes = {
  onClose: PropTypes.func,
};
