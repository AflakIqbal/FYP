import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../../actions/Admin/vehicleProfile';
import VehicleItem from './VehicleItem';
import Spinner from '../layout/spinner';

const Vehicle = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        Spinner
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Vehicles</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with Vehicles
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <VehicleItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> Browsing...... </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Vehicle.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
});

export default connect(mapStateToProp, { getProfiles })(Vehicle);
