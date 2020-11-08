/* eslint-disable no-console */
import axios from 'axios';

import { PUSH_MOVIES_TO_STORE, UPDATE_MOVIE, ADD_MOVIE, DELETE_MOVIE, SET_FILTER, SET_SORTING_OPTION, CLEAR_MOVIES_LIST }
  from './movies.constants';
import { url } from '@/utils/constants';

export const setFilter = name => ({
  type: SET_FILTER,
  payload: { name }
});

export const setSortingOption = name => ({
  type: SET_SORTING_OPTION,
  payload: { name }
});

export const pushMoviesToStore = movies => ({
  type: PUSH_MOVIES_TO_STORE,
  payload: { movies }
});

export const fetchMovies = (url) => async dispatch => {
  try {
    const response = await axios.get(url);

    dispatch(pushMoviesToStore(response.data.data));
  } catch (error) {
    console.error('Movies were not fetched.', error);
  }
};

export const addMovieAction = newMovie => ({
  type: ADD_MOVIE,
  payload: { movie: newMovie }
});

export const addMovie = movie => async dispatch => {
  try {
    const response = await axios.post(url, movie);

    dispatch(addMovieAction(response.data));
  } catch (error) {
    console.error('Movie was not added.', error);
  }
};

export const updateMovieAction = updatedMovie => ({
  type: UPDATE_MOVIE,
  payload: { movie: updatedMovie }
});

export const updateMovie = movie => async dispatch => {
  try {
    const response = await axios.put(url, movie);

    dispatch(updateMovieAction(response.data));
  } catch (error) {
    console.error('Movie was not updated.', error);
  }
};

export const deleteMovieAction = id => ({
  type: DELETE_MOVIE,
  payload: { id }
});

export const deleteMovie = id => async dispatch => {
  try {
    await axios.delete(`${url}/${id}`);

    dispatch(deleteMovieAction(id));
  } catch (error) {
    console.error('Movie was not deleted.', error);
  }
};

export const clearMoviesList = () => ({
  type: CLEAR_MOVIES_LIST
});
