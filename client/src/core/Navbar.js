import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>
          Sawari
        </Link>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/subAdmin'>
                SubAdmin
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Customer
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Owner
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>
                Vehicle
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
