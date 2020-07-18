import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from '../../../img/download.jpg';

const VehicleItem = ({
  profile: { _id, type, manufacturer, model, transmission, available }
}) => {
  var avail = 'Available';
  if (!available) {
    avail = 'Booked';
  }
  return (
    <div className='profile bg-light'>
      <img src={download} alt='' className='round-img' />
      <div>
        <h2>{type}</h2>
        <p>
          {manufacturer} {model && <span> {model} </span>}{' '}
        </p>
        <p>{transmission}</p>
        <Link to={`/SubAdmin/Bookings/${_id}`} className='btn btn-primary'>
          Bookings
        </Link>
      </div>
      <ul>
        <li className='text-primary'>
          <i className='fas fa-address-book'></i>{' '}
          {avail && <span>{'Availaibility'}</span>}{' '}
        </li>
        <li className='text-primary'>
          <i className='fas fa-check'></i> {avail && <span>{avail}</span>}{' '}
        </li>
      </ul>
    </div>
  );
};

VehicleItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default VehicleItem;
