import React, { useContext } from 'react';

import { Context } from '@/app/context';
import { Search } from './components/Search/Search';
import { AppTitle } from '@/app/components/AppTitle/AppTitle';
import { MovieDetails } from './components/MovieDetails/MovieDetails';

import './Header.scss';

export const Header = () => {
  const [headerContext, setHeaderContext] = useContext(Context);

  return (
    <header className='container header'>
      <h1 className='header__title'>
        <AppTitle />
      </h1>
      {
        headerContext === 'search'
          ? <Search />
          : <MovieDetails movieId={headerContext} setHeaderContext={setHeaderContext} />
      }
    </header>
  );
};
