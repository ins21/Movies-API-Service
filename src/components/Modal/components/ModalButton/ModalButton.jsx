import React from 'react';
import PropTypes from 'prop-types';

export const ModalButton = ({ mode, text, onClick, type }) => (
  <button className={`modal__button modal__${mode}-button`} type={type} onClick={onClick}>
    {text}
  </button>
);

ModalButton.propTypes = {
  mode: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
