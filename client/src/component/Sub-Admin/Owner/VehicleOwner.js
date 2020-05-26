import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentOwnerVehicle } from '../../../actions/Sub-Admin/OwnerProfile';
import VehicleItem from './VehicleItem';
import Spinner from '../layout/spinner';

const VehicleOwner = ({
  getCurrentOwnerVehicle,
  pro,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getCurrentOwnerVehicle(pro._id);
  }, [getCurrentOwnerVehicle, pro._id]);

  console.log(pro._id);
  if (profiles.length !== 0) {
    return (
      <Fragment>
        {loading ? (
          Spinner
        ) : (
          <Fragment>
            {/* <h1 className='large text-primary'>VehicleOwner</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with VehicleOwner
          </p> */}
            <div className='profiles2'>
              {profiles.length > 0 ? (
                profiles.map(profile => (
                  <VehicleItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4> {Spinner} </h4>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  } else {
    return (
      <div>
        <h3>No Register Vehicle</h3>
      </div>
    );
  }
};

VehicleOwner.propTypes = {
  getCurrentOwnerVehicle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
});

export default connect(mapStateToProp, { getCurrentOwnerVehicle })(
  VehicleOwner
);
