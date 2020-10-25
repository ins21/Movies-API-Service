export const formValidation = (values, pickedGenres) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.overview) {
    errors.overview = 'Required';
  }

  if (!pickedGenres.size) {
    errors.genres = 'Pick at least one genre';
  }

  if (!(values.runtime > 0)) {
    errors.runtime = 'Must be a number';
  }

  if (!values['movie url'] || !values['movie url'].includes('http')) {
    errors['movie url'] = 'Must be in format: http://example.com/image.jpg';
  }

  return errors;
};
