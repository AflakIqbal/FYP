import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/Sub-Admin/auth';

const Navbar = ({ auth: { isAuthenticated, loading, userType }, logout }) => {
  const AdminLinks = (
    <ul>
      <li>
        <Link to='/AdminOwners'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Owners</span>
        </Link>
      </li>
      <li>
        <Link to='/AdminCustomer'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Customers</span>
        </Link>
      </li>
      <li>
        <Link to='/AdminVehicle'>
          <i className='fas fa-car'></i>{' '}
          <span className='hide-sm'>Vehicle</span>
        </Link>
      </li>
      <li>
        <Link to='/AdminReports'>
          <i className='fas fa-clipboard'></i>{' '}
          <span className='hide-sm'>Reports</span>
        </Link>
      </li>

      <li>
        <Link to='/Admin/SubAdmin'>
          <i className='fas fa-users'></i>{' '}
          <span className='hide-sm'>SubAdmin</span>
        </Link>
      </li>

      <li>
        <Link to='/AdminDashboard'>
          <i className='fas fa-user-circle'></i>{' '}
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

  const subAdminLinks = (
    <ul>
      <li>
        <Link to='/SubAdmin/Owners'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Owners</span>
        </Link>
      </li>
      <li>
        <Link to='/SubAdmin/Customer'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Customers</span>
        </Link>
      </li>
      <li>
        <Link to='/SubAdmin/Vehicle'>
          <i className='fas fa-car'></i>{' '}
          <span className='hide-sm'>Vehicle</span>
        </Link>
      </li>
      <li>
        <Link to='/SubAdmin/Reports'>
          <i className='fas fa-clipboard'></i>{' '}
          <span className='hide-sm'>Reports</span>
        </Link>
      </li>

      <li>
        <Link to='/SubAdminDashboard'>
          <i className='fas fa-user-circle'></i>{' '}
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
      <li>{/* <Link to='/SubAdminRegister'>Register</Link> */}</li>
      <li>{/* <Link to='/SubAdminLogin'>Login</Link> */}</li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>SAWARI</Link>
      </h1>
      {!loading && (
        <Fragment>
          {isAuthenticated && userType === 1
            ? subAdminLinks
            : isAuthenticated && userType === 0
            ? AdminLinks
            : guestLink}
        </Fragment>
      )}
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(mapStateToProp, { logout })(Navbar);
