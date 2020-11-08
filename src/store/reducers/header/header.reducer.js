import { SHOW_SEARCH, SHOW_MOVIE_DETAILS } from './header.constants';

const initialStore = {
  headerContent: 'search',
  currentMovieId: null,
};

const header = (store = initialStore, action) => {
  switch (action.type) {
  case SHOW_SEARCH:
    return { ...store, headerContent: 'search', currentMovieId: null };
  case SHOW_MOVIE_DETAILS:
    return { headerContent: 'movie-details', currentMovieId: action.payload.id };
  default:
    return store;
  }
};

export default header;
