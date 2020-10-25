/* eslint-disable no-console */
import axios from 'axios';

import { FETCH_MOVIES, UPDATE_MOVIE, ADD_MOVIE, DELETE_MOVIE, SET_FILTER, SET_SORTING_OPTION } from './movies.constants';
import { url } from '@/utils/constants';

export const setFilter = name => ({
  type: SET_FILTER,
  payload: { name }
});

export const setSortingOption = name => ({
  type: SET_SORTING_OPTION,
  payload: { name }
});

export const fetchMoviesAction = movies => ({
  type: FETCH_MOVIES,
  payload: { movies }
});

export const fetchMovies = () => async dispatch => {
  try {
    const response = await axios.get(url);
    console.log('response fetch', response);
    dispatch(fetchMoviesAction(response.data.data));
    console.log('success create!!!!!!!!!!!!');
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
    console.log('response', response);
    dispatch(addMovieAction(response.data));
    console.log('success create!!!!!!!!!!!!');
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
    console.log('response', response.data);
    dispatch(updateMovieAction(response.data));
    console.log('success update!!!!!!!!!!!!');
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
    console.log('success delete!!!!!!!!!!!!');
  } catch (error) {
    console.error('Movie was not deleted.', error);
  }
};
