import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { EditMovieModal } from './components/EditMovieModal/EditMovieModal';
import { AddMovieModal } from './components/AddMovieModal/AddMovieModal';
import { DeleteMovieModal } from './components/DeleteMovieModal/DeleteMovieModal';

import './Modal.scss';

export const Modal = ({ currentModal, onClose, data }) => {
  const getModal = (modalName) => {
    switch (modalName) {
    case 'add': return <AddMovieModal onClose={onClose} />;
    case 'edit': return <EditMovieModal movie={data} onClose={onClose} />;
    case 'delete': return <DeleteMovieModal onClose={onClose} />;
    }
  };

  const clickAwayHandler = ({ target: { className } }) => {
    if (className === 'modal-overlay') onClose();
  };

  useEffect(() => {
    window.addEventListener('click', clickAwayHandler);

    return () => window.removeEventListener('click', clickAwayHandler);
  }, []);

  return (
    <div className='modal-overlay'>
      {getModal(currentModal)}
    </div>
  );
};

Modal.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
  currentModal: PropTypes.string,
};

Modal.defaultProps = {
  data: {},
};
