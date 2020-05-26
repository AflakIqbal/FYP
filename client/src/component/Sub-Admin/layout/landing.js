import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Regional Officer</h1>
          <p className='lead'>
            Create a Sub-Admin profile in order to start your office
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/SubAdminLogin' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propType = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProp = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProp)(Landing);
