import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './MoviesFilters.scss';

export const MoviesFilters = (props) => {
  const { filters, sortingOptions, currentFilter, currentSortingOption, setCurrentFilter, setCurrentSortingOption } = props;

  const onListItemClick = event => {
    setCurrentFilter(event.target.getAttribute('value'));
  };

  const onSortingChange = event => {
    setCurrentSortingOption(event.target.value);
  };

  return (
    <section className='movies-filters'>
      <ul className='movies-filters__list'>
        {
          filters.map(item => (
            <li
              key={item}
              className={classNames('movies-filters__list-item', { 'movies-filters__list-item--active': currentFilter === item })}
              onClick={onListItemClick}
              value={item}
            >
              {item}
            </li>
          ))
        }
      </ul>

      <label className='movies-filters__sort-label' htmlFor='movies-filters__sort'>Sort by</label>
      <select
        name='movies-filters__sort'
        id='movies-filters__sort'
        className='movies-filters__sort'
        value={currentSortingOption}
        onChange={onSortingChange}
      >
        {
          sortingOptions.map(item => <option key={item} value={item}>{item}</option>)
        }
      </select>
    </section>
  );
};

MoviesFilters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string),
  sortingOptions: PropTypes.arrayOf(PropTypes.string),
  currentFilter: PropTypes.string,
  currentSortingOption: PropTypes.string,
  setCurrentFilter: PropTypes.func,
  setCurrentSortingOption: PropTypes.func,
};
