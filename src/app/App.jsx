import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Movies from './components/Movies/Movies';
import { Footer } from './components/Footer/Footer';
import NotFoundPage from './components/ErrorPages/NotFoundPage/NotFoundPage';

export const App = () => (
  <Router>
    <Switch>
      <Route path={['/', '/search', '/search/:id', '/film/:id']} exact>
        <Header />
        <Movies />
        <Footer />
      </Route>
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
