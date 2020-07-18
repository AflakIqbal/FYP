import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/Sub-Admin/auth';

const SubAdminNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/owners'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Owners</span>
        </Link>
      </li>
      <li>
        <Link to='/customer'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Customers</span>
        </Link>
      </li>
      <li>
        <Link to='/vehicle'>
          <i className='fas fa-car'></i>{' '}
          <span className='hide-sm'>Vehicle</span>
        </Link>
      </li>
      <li>
        <Link to='/reports'>
          <i className='fas fa-clipboard'></i>{' '}
          <span className='hide-sm'>Reports</span>
        </Link>
      </li>

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>My Profile</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLink = (
    <ul>
      <li>
        <Link to='/SubAdminRegister'>Register</Link>
      </li>
      <li>
        <Link to='/SubAdminLogin'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>SAWARI</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLink}</Fragment>
      )}
    </nav>
  );
};

SubAdminNavbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(mapStateToProp, { logout })(SubAdminNavbar);
