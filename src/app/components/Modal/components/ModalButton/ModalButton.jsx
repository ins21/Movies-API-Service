import React from 'react';
import PropTypes from 'prop-types';

import './ModalButton.scss';

export const ModalButton = ({ type, text, onClick }) => (
  <button className={`modal__button modal__${type}-button`} onClick={onClick}>
    {text}
  </button>
);

ModalButton.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};
