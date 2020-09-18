import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = preloadedState => (
  createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})(applyMiddleware(thunk))
  )
);

const store = configureStore({});

export default store;
