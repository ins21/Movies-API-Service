import { FETCH_MOVIES, UPDATE_MOVIE, ADD_MOVIE, DELETE_MOVIE, SET_FILTER, SET_SORTING_OPTION, CLEAR_MOVIES_LIST } from './movies.constants';

const initialStore = {
  moviesList: [],
  filter: 'all',
  sortingOption: 'date'
};

const movies = (store = initialStore, { type, payload: { movies, movie, id, name } = {} }) => {
  switch (type) {
  case FETCH_MOVIES:
    return { ...store, moviesList: [...store.moviesList, ...movies] };
  case ADD_MOVIE:
    return { ...store, moviesList: [...store.moviesList, movie] };
  case UPDATE_MOVIE:
    return {
      ...store,
      moviesList: store.moviesList.map(item => item.id === movie.id ? movie : item)
    };
  case DELETE_MOVIE:
    return { ...store, moviesList: store.moviesList.filter(item => item.id !== id) };
  case CLEAR_MOVIES_LIST:
    return { ...store, moviesList: [] };
  case SET_FILTER:
    return { ...store, filter: name };
  case SET_SORTING_OPTION:
    return { ...store, sortingOption: name };
  default:
    return store;
  }
};

export default movies;
