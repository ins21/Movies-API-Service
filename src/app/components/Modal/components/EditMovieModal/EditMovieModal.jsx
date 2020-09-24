import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import { ModalButton } from '../ModalButton/ModalButton';
import { GenresPickerModal } from '../GenresPickerModal/GenresPickerModal';
import { useToggle } from '@/utils/customHooks/useToggle';
import { formValidation } from '../../utils/formValidation';

export const EditMovieModal = ({ onClose, updateMovie, movie }) => {
  const { title, genres, release_date, id, poster_path, overview, runtime } = movie;
  const [inputValues, setInputValues] = useState(
    { title, genres, 'release date': release_date, id, 'movie url': poster_path, overview, runtime }
  );
  const [pickedGenres, setPickedGenres] = useState(new Set(genres));
  const [isGenresPickerModalOpened, toggleGenresPickerModal] = useToggle(false);

  const formik = useFormik({
    initialValues: inputValues,
    validate: (values) => formValidation(values, pickedGenres),
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => onSave(values),
  });

  const fields = [
    { labelName: 'movie id', initialValue: id },
    { labelName: 'title', initialValue: title, placeholder: 'Title here' },
    { labelName: 'release date', initialValue: release_date, placeholder: 'Select date' },
    { labelName: 'movie url', initialValue: poster_path, placeholder: 'Movie URL here' },
    { labelName: 'genres', initialValue: genres, placeholder: 'Select genres' },
    { labelName: 'overview', initialValue: overview, placeholder: 'Overview here' },
    { labelName: 'runtime', initialValue: runtime, placeholder: 'Runtime here' },
  ];

  const onReset = () => {
    setInputValues({ title, genres, 'release date': release_date, id, 'movie url': poster_path, overview, runtime });
    setPickedGenres(new Set(genres));
    formik.resetForm({ title, genres, 'release date': release_date, id, 'movie url': poster_path, overview, runtime });
  };

  const onSave = (formikValues) => {
    const { id, title, overview, runtime, 'movie url': poster_path, 'release date': release_date } = formikValues;
    const updatedMovie = { ...movie, id, title, overview, runtime: +runtime, poster_path, release_date, genres: [...pickedGenres] };

    updateMovie(updatedMovie);
    onClose();
  };

  const onCheckBoxChange = ({ target: { value } }) => {
    pickedGenres.has(value)
      ? setPickedGenres(new Set([...pickedGenres].filter((item) => item !== value)))
      : setPickedGenres(new Set(pickedGenres.add(value)));
  };

  const getFieldContent = (labelName, placeholder) => {
    const onGenresClick = event => {
      setInputValues(formik.values);
      event.preventDefault();
      toggleGenresPickerModal();
    };

    switch (labelName) {
    case 'genres': return (
      <p className='modal__genres-wrapper'>
        <input
          id={labelName}
          name={labelName}
          className='modal__value modal__genres'
          placeholder={placeholder}
          value={[...pickedGenres].sort((a, b) => (a > b ? 1 : -1)).join(', ')}
          readOnly
          required='required'
        />
        <span className='modal__genres-icon' onClick={onGenresClick} />
        {formik.errors[labelName] ? <span className='modal__field-error'>{formik.errors[labelName]}</span> : null}
      </p>
    );
    case 'movie id': return <p className='modal__movie-id'>{id}</p>;
    default: return (
      <>
        <input
          className='modal__value'
          name={labelName}
          placeholder={placeholder}
          type={labelName === 'release date' ? 'date' : 'text'}
          onChange={formik.handleChange}
          value={formik.values[labelName] || ''}
        />
        {formik.errors[labelName] ? <span className='modal__field-error'>{formik.errors[labelName]}</span> : null}
      </>
    );
    }
  };

  return (
    <section className='modal'>
      <h2 className='modal__title'>Edit Movie</h2>
      <form className='modal__fields-list' onSubmit={formik.handleSubmit}>
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
          <ModalButton mode='secondary' type='button' text='reset' onClick={onReset} />
          <ModalButton mode='primary' type='submit' text='save' />
        </div>
      </form>
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
