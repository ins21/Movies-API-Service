import React from 'react';
import PropTypes from 'prop-types';

import { genresList } from '@/data/genresList';

import './GenresPickerModal.scss';

export const GenresPickerModal = ({ onCheckBoxChange, pickedGenres, onClose }) =>
  <div className='modal__genres-picker'>
    {
      genresList.map(item =>
        <label key={item} className='modal__genres-checkbox'>
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

GenresPickerModal.propTypes = {
  pickedGenres: PropTypes.object,
  onCheckBoxChange: PropTypes.func,
  onClose: PropTypes.func,
};
