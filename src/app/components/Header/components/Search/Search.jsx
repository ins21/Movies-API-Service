import React, { useState } from 'react';

import Modal from '@/app/components/Modal/Modal';

import './Search.scss';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentModal, setCurrentModal] = useState();

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
    <section className='search'>
      <button className='search__add-button common-button' onClick={onAddClick}>
        + Add Movie
      </button>
      <h2 className='search__description'>Find your movie</h2>
      <div className='search__field'>
        <input
          type='text'
          className='search__input'
          placeholder='What do you want to watch?'
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onEnterPress}
        />
        <button className='search__search-button common-button' onClick={onSearchClick}>
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
    </section>
  );
};
