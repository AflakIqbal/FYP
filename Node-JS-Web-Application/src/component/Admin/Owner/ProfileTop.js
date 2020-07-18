import React from 'react';
import PropTypes from 'prop-types';
import download from '../../../img/download.png';
//import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: { name, email, cellPhone, address, city, imageURI },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-imgF my-1' src={imageURI} alt='' />
      <h1 className='large'> {name} </h1>
      <p className='lead'>Work as Owner at SAWARI</p>
      <p>Emial: {email}</p>
      <p>Contact: {cellPhone}</p>

      <p>Address: {address}</p>
      <p>City: {city}</p>
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
