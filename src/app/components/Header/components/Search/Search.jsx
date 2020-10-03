import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import Modal from '@/app/components/Modal/Modal';
import { url } from '@/utils/constants';

import './Search.scss';

export const Search = ({ fetchMovies, clearMoviesList }) => {
  const [inputValue, setInputValue] = useState('');
  const [currentModal, setCurrentModal] = useState();
  const history = useHistory();

  const findMoviesByTitleOrGenre = value => {
    clearMoviesList();
    history.push(`/search/${value}`);
    fetchMovies(`${url}?search=${value}&searchBy=title`);
    fetchMovies(`${url}?search=${value}&searchBy=genres`);
    setInputValue('');
  };

  const onInputChange = event => {
    setInputValue(event.target.value);
  };

  const onSearchClick = event => {
    if (inputValue.trim().length) {
      event.preventDefault();
      findMoviesByTitleOrGenre(inputValue);
    }
  };

  const onEnterPress = event => {
    if (event.key === 'Enter' && inputValue.trim().length) {
      findMoviesByTitleOrGenre(inputValue);
    }
  };

  const onAddClick = () => {
    setCurrentModal('add');
  };

  useEffect(() => {
    const { location: { pathname } } = history;
    const query = pathname.replace('/search/', '');

    if (pathname.includes('/search/') && query.length) {
      findMoviesByTitleOrGenre(query);
    }
  }, []);

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
