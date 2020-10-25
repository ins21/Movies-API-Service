import { combineReducers } from 'redux';
import header from './header/header.reducer';
import movies from './movies/movies.reducer';

const rootReducer = combineReducers({ header, movies });

export default rootReducer;
