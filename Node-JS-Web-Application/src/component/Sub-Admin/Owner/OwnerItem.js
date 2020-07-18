import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from '../../../img/download.png';
import { deleteOwnerForSubAdmin } from '../../../actions/Sub-Admin/OwnerProfile';
import { connect } from 'react-redux';

const OwnerItem = ({
  deleteOwnerForSubAdmin,
  profile: { _id, name, email, cellPhone, address, imageURI },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={imageURI} alt='' className='round-imgF' />
      <div>
        <h2>{name}</h2>
        <p>{email} </p>
        <p>{cellPhone} </p>
        <Link to={`/SubAdmin/OwnerById/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
        <button
          className='btn btn-danger'
          onClick={() => deleteOwnerForSubAdmin(_id)}
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

OwnerItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteOwnerForSubAdmin: PropTypes.func.isRequired,
};

export default connect(null, { deleteOwnerForSubAdmin })(OwnerItem);
