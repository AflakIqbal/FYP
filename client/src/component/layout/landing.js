import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated, userType }) => {
  if (isAuthenticated && userType === 1) {
    return <Redirect to='/SubAdminDashboard' />;
  }
  if (isAuthenticated && userType === 0) {
    return <Redirect to='/AdminDashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Welcome To SAWARI</h1>
          <p className='lead'>
            It's great to ride with you while you're taking care of business
          </p>
          <div className='buttons'>
            <Link to='/AdminLogin' className='btn btn-primary'>
              SignIn As Admin
            </Link>
            <Link to='/SubAdminLogin' className='btn btn-primary'>
              SignIn As SubAdmin
            </Link>

            {/* <Link to='/SubAdminLogin' className='btn btn-light'>
              Login As Sub-Admin
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propType = {
  isAuthenticated: PropTypes.bool,
  userType: PropTypes.any
};

const mapStateToProp = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userType: state.auth.userType
});
export default connect(mapStateToProp)(Landing);
