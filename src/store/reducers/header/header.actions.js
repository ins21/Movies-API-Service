import { SHOW_SEARCH, SHOW_MOVIE_DETAILS } from './header.constants';

export const showSearch = () => ({
  type: SHOW_SEARCH,
});

export const showMovieDetails = (id) => ({
  type: SHOW_MOVIE_DETAILS,
  payload: { id }
});
