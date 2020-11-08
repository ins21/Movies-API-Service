import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { EditMovieModal } from './components/EditMovieModal/EditMovieModal';
import { AddMovieModal } from './components/AddMovieModal/AddMovieModal';
import { DeleteMovieModal } from './components/DeleteMovieModal/DeleteMovieModal';
import { addMovie, updateMovie, deleteMovie } from '@/store/reducers/movies/movies.actions';
import { showSearch } from '@/store/reducers/header/header.actions';

const Modal = ({ currentModal, onClose, data, addMovie, updateMovie, deleteMovie, showSearch }) => {
  const getModal = modalName => {
    switch (modalName) {
    case 'add': return <AddMovieModal onClose={onClose} addMovie={addMovie} />;
    case 'edit': return <EditMovieModal movie={data} onClose={onClose} updateMovie={updateMovie} />;
    case 'delete': return <DeleteMovieModal id={data.id} onClose={onClose} deleteMovie={deleteMovie} showSearch={showSearch} />;
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
  addMovie: PropTypes.func,
  updateMovie: PropTypes.func,
  deleteMovie: PropTypes.func,
  showSearch: PropTypes.func,
};

Modal.defaultProps = {
  data: {},
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { addMovie, updateMovie, deleteMovie, showSearch };

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
