import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from '../../../img/download.png';
import { deleteCustomerForSubAdmin } from '../../../actions/Admin/SubAdminProfile';
import { connect } from 'react-redux';

const SubAdminItem = ({
  deleteCustomerForSubAdmin,
  profile: { _id, name, email, cellPhone, address }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={download} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
        <p>{cellPhone}</p>
        <Link to={`/Admin/SubAdminById/${_id}`} className='btn btn-primary'>
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

SubAdminItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteCustomerForSubAdmin: PropTypes.func.isRequired
};

export default connect(null, { deleteCustomerForSubAdmin })(SubAdminItem);
