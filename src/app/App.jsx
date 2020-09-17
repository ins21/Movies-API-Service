import React, { useState } from 'react';

import { Context } from './context';
import { Header } from './components/Header/Header';
import { Movies } from './components/Movies/Movies';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const [headerContext, setHeaderContext] = useState('search');

  return (
    <Context.Provider value={[headerContext, setHeaderContext]}>
      <Header />
      <Movies />
      <Footer />
    </Context.Provider>
  );
};
