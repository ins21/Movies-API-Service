import React from 'react';
import PropTypes from 'prop-types';

import { genresList } from '@/data/genresList';

import './GenrePickerModal.scss';

export const GenrePickerModal = ({ onCheckBoxChange, pickedGenres, onClose }) =>
  <div className='modal__genre-picker'>
    {
      genresList.map(item =>
        <label key={item} className='modal__genre-checkbox'>
          <input
            type='checkbox'
            value={item}
            name={item}
            onChange={onCheckBoxChange}
            checked={pickedGenres.has(item)}
          />
          {item}
        </label>
      )
    }
    <span className='modal__close' onClick={onClose} />
  </div>;

GenrePickerModal.propTypes = {
  pickedGenres: PropTypes.object,
  onCheckBoxChange: PropTypes.func,
  onClose: PropTypes.func,
};
