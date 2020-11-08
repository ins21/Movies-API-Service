import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Modal from '@/components/Modal/Modal';
import { url } from '@/utils/constants';

export const Search = ({ fetchMovies, clearMoviesList }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentModal, setCurrentModal] = useState();

  const findMoviesByTitle = value => {
    clearMoviesList();
    Router.push(`/search/${value}`);
    fetchMovies(`${url}?search=${value}&searchBy=title`);
    setInputValue('');
  };

  const onInputChange = event => {
    setInputValue(event.target.value);
  };

  const onSearchClick = event => {
    if (inputValue.trim().length) {
      event.preventDefault();
      findMoviesByTitle(inputValue);
    }
  };

  const onEnterPress = event => {
    if (event.key === 'Enter' && inputValue.trim().length) {
      findMoviesByTitle(inputValue);
    }
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

Search.propTypes = {
  fetchMovies: PropTypes.func,
  clearMoviesList: PropTypes.func,
};
