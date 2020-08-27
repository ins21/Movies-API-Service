import React, { useState } from 'react';

import { moviesFilters, moviesSortingOptions } from '@/utils/constants/index';
import { MoviesFilters } from './components/MoviesFilters/MoviesFilters';
import { MoviesList } from './components/MoviesList/MoviesList';

import './Movies.scss';

export const Movies = () => {
  const [currentFilter, setCurrentFilter] = useState(moviesFilters[0]);
  const [currentSortingOption, setCurrentSortingOption] = useState(moviesSortingOptions[0]);

  return (
    <main className='container movies'>
      <MoviesFilters
        filters={moviesFilters}
        sortingOptions={moviesSortingOptions}
        currentFilter={currentFilter}
        currentSortingOption={currentSortingOption}
        setCurrentFilter={setCurrentFilter}
        setCurrentSortingOption={setCurrentSortingOption}
      />
      <MoviesList
        currentFilter={currentFilter}
        currentSortingOption={currentSortingOption}
      />
    </main>
  );
};
