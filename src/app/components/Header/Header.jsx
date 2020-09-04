import React, { useState } from 'react';

import { Modal } from '@/app/components/Modal/Modal';
import { AppTitle } from '../AppTitle/AppTitle';

import './Header.scss';

export const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentModal, setCurrentModal] = useState(false);

  const onInputChange = event => {
    setInputValue(event.target.value);
  };

  const onSearchClick = event => {
    event.preventDefault();
    setInputValue('');
  };

  const onEnterPress = event => {
    if (event.key === 'Enter') setInputValue('');
  };

  const onAddClick = () => {
    setCurrentModal('add');
  };

  return (
    <header className='container header'>
      <h1 className='header__title'>
        <AppTitle />
      </h1>
      <button className='header__add-button common-button' onClick={onAddClick}>
        + Add Movie
      </button>
      <h2 className='header__description'>Find your movie</h2>
      <div className='header__search'>
        <input
          type='text'
          className='header__search-input'
          placeholder='What do you want to watch?'
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onEnterPress}
        />
        <button className='header__search-button common-button' onClick={onSearchClick}>
          Search
        </button>
      </div>
      {
        currentModal &&
          <Modal
            currentModal={currentModal}
            onClose={() => setCurrentModal(null)}
          />
      }
    </header>
  );
};
