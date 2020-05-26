import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from '../../../img/download.jpg';
import { connect } from 'react-redux';
import { deleteVehicleForSubAdmin } from '../../../actions/Sub-Admin/vehicleProfile';

const VehicleItem = ({
  profile: { _id, type, manufacturer, model, transmission, available },
  deleteVehicleForSubAdmin
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
        <Link to={`/SubAdmin/VehicleById/${_id}`} className='btn btn-primary'>
          View Vehicle
        </Link>
        <button
          className='btn btn-danger'
          onClick={() => deleteVehicleForSubAdmin(_id)}
        >
          Delete
        </button>
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
  profile: PropTypes.object.isRequired,
  deleteVehicleForSubAdmin: PropTypes.func.isRequired
};

export default connect(null, {
  deleteVehicleForSubAdmin
})(VehicleItem);
