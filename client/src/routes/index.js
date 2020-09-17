import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../routes/dashboard';
import Login from '../routes/login';
import RegistrationForm from '../routes/register';

import CreateAppointment from './createAppointment/';

import { routes } from '../constants/route';

const ProtectedRoute = props => {
  return props && props.username ? (
    <Switch>
      <Route exact path={routes.HOME} component={Dashboard} />
      <Route exact path={`${routes.CreateAppointment}`} component={CreateAppointment} />
    </Switch>
  ) : (
      <Redirect to="/login" />
    );
};

const CustomRoute = props => {
  return (
    <BrowserRouter>
      {ProtectedRoute(props.userData)}
      <Route exact path={routes.REGISTER} component={RegistrationForm} />
      <Route exact path={routes.LOGIN} component={Login} />
    </BrowserRouter>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.loginReducer,
  };
};

export default connect(mapStateToProps)(CustomRoute);
