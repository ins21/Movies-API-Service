import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import headerReducer from '../src/store/reducers/header/header.reducer';
import { showSearch, showMovieDetails } from '../src/store/reducers/header/header.actions';

configure({ adapter: new Adapter() });

describe('Header reducer', () => {
  it('Must work correctly for action.type "SHOW_SEARCH"', () => {
    expect(headerReducer({}, { type: 'SHOW_SEARCH' })).toEqual(
      {
        currentMovieId: null,
        headerContent: 'search'
      }
    );
  });

  it('Must work correctly for action.type "SHOW_MOVIE_DETAILS"', () => {
    expect(headerReducer({}, { type: 'SHOW_MOVIE_DETAILS', payload: { id: 1 } })).toEqual(
      {
        headerContent: 'movie-details',
        currentMovieId: 1,
      }
    );
  });

  it('Must work correctly if store is undefined', () => {
    expect(headerReducer(undefined, { type: 'SHOW_SEARCH' })).toEqual(
      {
        headerContent: 'search',
        currentMovieId: null,
      }
    );
  });

  it('Must return the same store, if wrong action.type was passed', () => {
    expect(headerReducer({ headerContent: 'search' }, { type: 'wrong type' })).toEqual(
      {
        headerContent: 'search'
      }
    );
  });
});

describe('Header actions', () => {
  it('Action "showSearch" must return correct object', () => {
    expect(showSearch()).toEqual(
      {
        type: 'SHOW_SEARCH'
      }
    );
  });

  it('Action "showMovieDetails" must return correct object', () => {
    expect(showMovieDetails(123)).toEqual(
      {
        type: 'SHOW_MOVIE_DETAILS',
        payload: { id: 123 }
      }
    );
  });
});
