import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import download from '../../../img/download.png';

const Dashboard = ({ auth: { user, loading } }) => {
  var name = '';
  var email = '';
  var cellPhone = '';
  var address = '';
  var officeLocation = '';
  var imageURI = '';
  if (user) {
    name = user.name;
    email = user.email;
    cellPhone = user.cellPhone;
    address = user.address;
    officeLocation = user.officeLocation;
    imageURI = user.imageURI;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {name}
      </p>
      <div className='profile2 bg-light'>
        <div>
          <h1>{name}</h1>

          <h4>{email}</h4>
          <h5>{cellPhone}</h5>
          <h5>Lives in {address}</h5>
          <h4>Office Location {officeLocation} </h4>
          {/* <p>{transmission}</p>
        <Link to={`/Bookings/${_id}`} className='btn btn-primary'>
          Bookings
        </Link> */}
        </div>
        <img className='round-img1 my-1' src={imageURI} alt='' />
      </div>
    </Fragment>
  );
};

Dashboard.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProp = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProp)(Dashboard);
