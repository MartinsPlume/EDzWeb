import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from "./Authentication";


export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    // load the current user if there is one
      if (!authenticationService.currentUserValue) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }

      // authorised so return component
      return <Component {...props} />
  }} />
)