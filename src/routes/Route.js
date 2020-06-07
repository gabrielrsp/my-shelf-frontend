import React from 'react';
import PropTypes from 'prop-types';
import decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  let { signed, token } = store.getState().auth;

  if (token) {
    const { exp } = decode(token) // get expiration date from token
    if (exp < new Date().getTime() / 1000) {
      token = '';
      signed = false;
    }
  }

  if (!token && isPrivate) {
    return <Redirect to="/" />;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/main" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (

    <Route {...rest}
      render={props => (
        <AnimatePresence>
          <Layout>
            <Component {...props} />
          </Layout>
        </AnimatePresence>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false,
}
