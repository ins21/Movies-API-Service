import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalButton } from '../ModalButton/ModalButton';
import { GenresPickerModal } from '../GenresPickerModal/GenresPickerModal';
import { useToggle } from '@/utils/customHooks/useToggle';

export const AddMovieModal = ({ addMovie, onClose }) => {
  const [inputValues, setInputValues] = useState({});
  const [pickedGenres, setPickedGenres] = useState(new Set());
  const [isGenresPickerModalOpened, toggleGenresPickerModal] = useToggle(false);

  const fields = [
    { labelName: 'title', placeholder: 'Title here' },
    { labelName: 'release date', placeholder: 'Select date' },
    { labelName: 'movie url', placeholder: 'Movie URL here' },
    { labelName: 'genres', placeholder: 'Select genres' },
    { labelName: 'overview', placeholder: 'Overview here' },
    { labelName: 'runtime', placeholder: 'Runtime here' },
  ];

  const onInputChange = (event, name) => {
    setInputValues({ ...inputValues, [name]: event.target.value });
  };

  const onSave = () => {
    const { title, overview, runtime, 'movie url': poster_path = 'https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg', 'release date': release_date } = inputValues;
    const newMovie = { title, overview, runtime: +runtime, poster_path, release_date, genres: [...pickedGenres] };

    addMovie(newMovie);
    onClose();
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

  const getFieldContent = (labelName, placeholder) => {
    switch (labelName) {
    case 'genres': return (
      <p className='modal__genres-wrapper' onClick={toggleGenresPickerModal}>
        <input
          className='modal__value modal__genres'
          placeholder={placeholder}
          value={[...pickedGenres].sort((a, b) => (a > b ? 1 : -1)).join(', ')}
          readOnly
          required='required'
        />
        <span className='modal__genres-icon' />
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
        <ModalButton type='primary' text='save' onClick={onSave} />
      </div>
      {
        isGenresPickerModalOpened &&
          <GenresPickerModal
            pickedGenres={pickedGenres}
            onCheckBoxChange={onCheckBoxChange}
            onClose={toggleGenresPickerModal}
          />
      }
      <span className='modal__close' onClick={onClose} />
    </section>
  );
};

AddMovieModal.propTypes = {
  onClose: PropTypes.func,
  addMovie: PropTypes.func,
};
