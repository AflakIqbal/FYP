import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from '../../../img/download.png';
import { deleteCustomerForSubAdmin } from '../../../actions/Admin/CustomerProfile';
import { connect } from 'react-redux';

const CustomerItem = ({
  deleteCustomerForSubAdmin,
  profile: { _id, name, email, cellPhone, address, imageURI },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={imageURI} alt='' className='round-imgF' />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
        <p>{cellPhone}</p>
        <Link to={`/Admin/CustomerById/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
        <button
          className='btn btn-danger'
          onClick={() => deleteCustomerForSubAdmin(_id)}
        >
          Delete
        </button>
      </div>
      <ul>
        <li className='text-primary'>
          <i className='fas fa-address-book'></i>{' '}
          {address && <span>{'Availaible In'}</span>}{' '}
        </li>
        <li className='text-primary'>
          <i className='fas fa-check'></i> {address && <span>{address}</span>}{' '}
        </li>
      </ul>
    </div>
  );
};

CustomerItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteCustomerForSubAdmin: PropTypes.func.isRequired,
};

export default connect(null, { deleteCustomerForSubAdmin })(CustomerItem);
