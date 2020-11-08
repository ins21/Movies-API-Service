import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import { ModalButton } from '../ModalButton/ModalButton';
import { GenresPickerModal } from '../GenresPickerModal/GenresPickerModal';
import { useToggle } from '../../../../utils/customHooks/useToggle';
import { addMovieFields } from './constants';
import { formValidation } from '../../utils/formValidation';

export const AddMovieModal = ({ addMovie, onClose }) => {
  const [inputValues, setInputValues] = useState({});
  const [pickedGenres, setPickedGenres] = useState(new Set());
  const [isGenresPickerModalOpened, toggleGenresPickerModal] = useToggle(false);

  const formik = useFormik({
    initialValues: inputValues,
    validate: (values) => formValidation(values, pickedGenres),
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: (values) => onSave(values),
  });

  const onSave = (formikValues) => {
    const { title, overview, runtime, 'movie url': poster_path, 'release date': release_date } = formikValues;
    const newMovie = { title, overview, runtime: +runtime, poster_path, release_date, genres: [...pickedGenres] };

    addMovie(newMovie);
    onClose();
  };

  const onReset = () => {
    setInputValues({});
    setPickedGenres(new Set());
    formik.resetForm({});
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
    default: return (
      <>
        <input
          id={labelName}
          className='modal__value'
          placeholder={placeholder}
          name={labelName}
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
      <form className='modal__fields-list' onSubmit={formik.handleSubmit}>
        {
          addMovieFields.map(({ labelName, placeholder }) => (
            <li key={labelName} className='modal__field'>
              <label className='modal__field-label'>
                {labelName}
                {getFieldContent(labelName, placeholder)}
              </label>
            </li>
          ))
        }
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

AddMovieModal.propTypes = {
  onClose: PropTypes.func,
  addMovie: PropTypes.func,
};
