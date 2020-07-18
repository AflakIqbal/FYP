import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/SubAdminLogin' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

AdminPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth
});
export default connect(mapStateToProp)(AdminPrivateRoute);
