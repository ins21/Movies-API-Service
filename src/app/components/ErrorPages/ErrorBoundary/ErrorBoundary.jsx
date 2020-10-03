import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AppTitle } from '@/app/components/AppTitle/AppTitle';

import './ErrorBoundary.scss';

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError () {
    return { hasError: true };
  }

  render () {
    if (this.state.hasError) {
      return (
        <section className='container'>
          <AppTitle />
          <h1 className='error-boundary__message'>Oops! Something went wrong.</h1>
        </section>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
