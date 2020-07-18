import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentOwnerVehicle } from '../../../actions/Sub-Admin/OwnerProfile';
import VehicleItem from '../Vehicle/VehicleItem';
import Spinner from '../layout/spinner';

const OwnerBookings = ({
  getCurrentOwnerVehicle,
  pro,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getCurrentOwnerVehicle(pro._id);
  }, [getCurrentOwnerVehicle, pro._id]);

  console.log(pro._id);

  return (
    <Fragment>
      {loading ? (
        Spinner
      ) : (
        <Fragment>
          {/* <h1 className='large text-primary'>OwnerBookings</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with OwnerBookings
          </p> */}
          <div className='profiles'>
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
};

OwnerBookings.propTypes = {
  getCurrentOwnerVehicle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
});

export default connect(mapStateToProp, { getCurrentOwnerVehicle })(
  OwnerBookings
);
