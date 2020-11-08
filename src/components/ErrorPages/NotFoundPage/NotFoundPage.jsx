import React from 'react';
import Router from 'next/router';

import { AppTitle } from '@/components/AppTitle/AppTitle';
import { Footer } from '@/components/Footer/Footer';
import { ModalButton } from '@/components/Modal/components/ModalButton/ModalButton';

import imageSrc from './assets/404.png';

const NotFoundPage = () => {
  return (
    <section className='container not-found-page'>
      <AppTitle />
      <h2 className='not-found-page__message'>Page not found</h2>
      <img src={imageSrc} />
      <ModalButton mode='secondary' text='go back to home' onClick={() => Router.push('/')} />
      <Footer />
    </section>
  );
};

export default NotFoundPage;
