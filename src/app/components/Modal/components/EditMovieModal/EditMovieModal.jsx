import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalButton } from '../ModalButton/ModalButton';
import { GenresPickerModal } from '../GenresPickerModal/GenresPickerModal';
import { useToggle } from '@/utils/customHooks/useToggle';

export const EditMovieModal = ({ onClose, updateMovie, movie }) => {
  const { title, genres, release_date, id, poster_path, overview, runtime } = movie;
  const [inputValues, setInputValues] = useState(
    { title, genres, 'release date': release_date, id, 'movie url': poster_path, overview, runtime }
  );
  const [pickedGenres, setPickedGenres] = useState(new Set(genres));
  const [isGenresPickerModalOpened, toggleGenresPickerModal] = useToggle(false);

  const fields = [
    { labelName: 'movie id', initialValue: id },
    { labelName: 'title', initialValue: title, placeholder: 'Title here' },
    { labelName: 'release date', initialValue: release_date, placeholder: 'Select date' },
    { labelName: 'movie url', initialValue: poster_path, placeholder: 'Movie URL here' },
    { labelName: 'genres', initialValue: genres, placeholder: 'Select genres' },
    { labelName: 'overview', initialValue: overview, placeholder: 'Overview here' },
    { labelName: 'runtime', initialValue: runtime, placeholder: 'Runtime here' },
  ];

  const onInputChange = ({ target: { value } }, name) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const onReset = () => {
    setInputValues({ title, genres, 'release date': release_date, id, 'movie url': poster_path, overview, runtime });
    setPickedGenres(new Set(genres));
  };

  const onSave = () => {
    const { id, title, overview, runtime, 'movie url': poster_path, 'release date': release_date } = inputValues;
    const updatedMovie = { ...movie, id, title, overview, runtime: +runtime, poster_path, release_date, genres: [...pickedGenres] };

    updateMovie(updatedMovie);
    onClose();
  };

  const onCheckBoxChange = ({ target: { value } }) => {
    pickedGenres.has(value)
      ? setPickedGenres(new Set([...pickedGenres].filter((item) => item !== value)))
      : setPickedGenres(new Set(pickedGenres.add(value)));
  };

  const getFieldContent = (labelName, initialValue, placeholder) => {
    switch (labelName) {
    case 'genres': return (
      <p className='modal__genres-wrapper' onClick={toggleGenresPickerModal}>
        <input
          className='modal__value modal__genres'
          placeholder={placeholder}
          value={[...pickedGenres].sort((a, b) => (a > b ? 1 : -1)).join(', ')}
          readOnly
        />
        <span className='modal__genres-icon' />
      </p>
    );
    case 'movie id': return <p className='modal__movie-id'>{id}</p>;
    default: return (
      <input
        className='modal__value'
        placeholder={placeholder}
        value={inputValues[labelName] ?? initialValue}
        onChange={event => onInputChange(event, labelName)}
        type={labelName === 'release date' ? 'date' : 'text'}
      />
    );
    }
  };

  return (
    <section className='modal'>
      <h2 className='modal__title'>Edit Movie</h2>
      <ul className='modal__fields-list'>
        {
          fields.map(({ labelName, initialValue, placeholder }) => (
            <li key={labelName} className='modal__field'>
              <label className='modal__field-label'>
                {labelName}
                {getFieldContent(labelName, initialValue, placeholder)}
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

EditMovieModal.propTypes = {
  movie: PropTypes.object,
  onClose: PropTypes.func,
  updateMovie: PropTypes.func,
};
