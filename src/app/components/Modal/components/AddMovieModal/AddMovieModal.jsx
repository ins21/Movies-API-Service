import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalButton } from '../ModalButton/ModalButton';
import { GenrePickerModal } from '../GenrePickerModal/GenrePickerModal';

export const AddMovieModal = ({ onClose }) => {
  const [inputValues, setInputValues] = useState({});
  const [pickedGenres, setPickedGenres] = useState(new Set());
  const [isGenrePickerModalOpened, setGenrePickerModalOpened] = useState(false);

  const fields = [
    { labelName: 'title', placeholder: 'Title here' },
    { labelName: 'release date', placeholder: 'Select date' },
    { labelName: 'movie url', placeholder: 'Movie URL here' },
    { labelName: 'genre', placeholder: 'Select genre' },
    { labelName: 'overview', placeholder: 'Overview here' },
    { labelName: 'runtime', placeholder: 'Runtime here' },
  ];

  const onInputChange = (event, name) => {
    setInputValues({ ...inputValues, [name]: event.target.value });
  };

  const onReset = () => {
    setInputValues({});
    setPickedGenres(new Set());
  };

  const onCheckBoxChange = ({ target: { value } }) => {
    pickedGenres.has(value)
      ? setPickedGenres(new Set([...pickedGenres].filter((item) => item !== value)))
      : setPickedGenres(new Set(pickedGenres.add(value)));
  };

  const onGenrePickerClose = event => {
    setGenrePickerModalOpened(false);
    event.stopPropagation();
  };

  const getFieldContent = (labelName, placeholder) => {
    switch (labelName) {
    case 'genre': return (
      <p className='modal__genre-wrapper' onClick={() => setGenrePickerModalOpened(true)}>
        <input
          className='modal__value modal__genre'
          placeholder={placeholder}
          value={[...pickedGenres].sort((a, b) => (a > b ? 1 : -1)).join(', ')}
          readOnly
        />
        <span className='modal__genre-icon' />
      </p>
    );
    default: return (
      <input
        className='modal__value'
        placeholder={placeholder}
        value={inputValues[labelName] ?? ''}
        onChange={event => onInputChange(event, labelName)}
        type={labelName === 'release date' ? 'date' : 'text'}
      />
    );
    }
  };

  return (
    <section className='modal'>
      <h2 className='modal__title'>Add Movie</h2>
      <ul className='modal__fields-list'>
        {
          fields.map(({ labelName, placeholder }) => (
            <li key={labelName} className='modal__field'>
              <label className='modal__field-label'>
                {labelName}
                {getFieldContent(labelName, placeholder)}
              </label>
            </li>
          ))
        }
      </ul>
      <div className='modal__button-wrapper'>
        <ModalButton type='secondary' text='reset' onClick={onReset} />
        <ModalButton type='primary' text='save' onClick={onClose} />
      </div>
      {
        isGenrePickerModalOpened &&
          <GenrePickerModal
            pickedGenres={pickedGenres}
            onCheckBoxChange={onCheckBoxChange}
            onClose={onGenrePickerClose}
          />
      }
      <span className='modal__close' onClick={onClose} />
    </section>
  );
};

AddMovieModal.propTypes = {
  onClose: PropTypes.func,
};
