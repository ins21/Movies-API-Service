import React from 'react';
import { useHistory } from 'react-router';

import { AppTitle } from '@/app/components/AppTitle/AppTitle';
import { Footer } from '@/app/components/Footer/Footer';
import { ModalButton } from '@/app/components/Modal/components/ModalButton/ModalButton';

import './NotFoundPage.scss';
import imageSrc from './assets/404.png';

const NotFoundPage = () => {
  const history = useHistory();

  return (
    <section className='container not-found-page'>
      <AppTitle />
      <h2 className='not-found-page__message'>Page not found</h2>
      <img src={imageSrc} />
      <ModalButton mode='secondary' text='go back to home' onClick={() => history.push('/')} />
      <Footer />
    </section>
  );
};

export default NotFoundPage;
