import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ModalButton } from '../ModalButton/ModalButton';
import { GenrePickerModal } from '../GenrePickerModal/GenrePickerModal';

export const EditMovieModal = props => {
  const { onClose, movie: { title, genre, year, id, url, overview, runtime } } = props;
  const [inputValues, setInputValues] = useState({ title, genre, year, id, url, overview, runtime });
  const [pickedGenres, setPickedGenres] = useState(new Set(genre));
  const [isGenrePickerModalOpened, setGenrePickerModalOpened] = useState(false);

  const fields = [
    { labelName: 'movie id', initialValue: id },
    { labelName: 'title', initialValue: title, placeholder: 'Title here' },
    { labelName: 'release date', initialValue: year, placeholder: 'Select date' },
    { labelName: 'movie url', initialValue: url, placeholder: 'Movie URL here' },
    { labelName: 'genre', initialValue: genre, placeholder: 'Select genre' },
    { labelName: 'overview', initialValue: overview, placeholder: 'Overview here' },
    { labelName: 'runtime', initialValue: runtime, placeholder: 'Runtime here' },
  ];

  const onInputChange = ({ target: { value } }, name) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const onReset = () => {
    setInputValues({ title, genre, year, id, url, overview, runtime });
    setPickedGenres(new Set(genre));
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

  const getFieldContent = (labelName, initialValue, placeholder) => {
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

EditMovieModal.propTypes = {
  movie: PropTypes.object,
  onClose: PropTypes.func,
};
