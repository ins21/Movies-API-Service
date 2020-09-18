import { createSelector } from 'reselect';

const moviesList = state => state.movies.moviesList;
const currentFilter = state => state.movies.filter;
const currentSortingOption = state => state.movies.sortingOption;

export const filteredAndSortedMovies = createSelector(
  moviesList,
  currentFilter,
  currentSortingOption,
  (movies, filter, sortingOption) => movies
    .filter(({ genres }) => genres.some((item) => item.toLowerCase().includes(filter)) || filter === 'all')
    .sort((a, b) => {
      if (sortingOption === 'rating') return b.vote_average > a.vote_average ? 1 : -1;
      return a.release_date > b.release_date ? 1 : -1;
    })
);
