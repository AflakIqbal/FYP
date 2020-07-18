import React from 'react';
import PropTypes from 'prop-types';
//import download from '../../img/download.jpg';
import download from '../../../img/car.webp';

//import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: {
    type,
    manufacturer,
    model,
    year,
    seatingCapacity,
    transmission,
    fare,
    available,
    imageURI,
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img2 my-1' src={imageURI} alt='' />
      <h1 className='large'>
        {' '}
        {manufacturer} {model}
      </h1>
      <p className='lead'>Registered at SAWARI</p>
      <p>Transmition: {transmission}</p>
      <p>Model: {year}</p>
      <p>Seating Capacity: {seatingCapacity}</p>
      <p>Fare: {fare}</p>
      <div className='icons my-1'>
        <i className='fas fa-car fa-2x'> {'   '}</i>
        {'   '}
        <i className='fas fa-motorcycle fa-2x'></i>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
