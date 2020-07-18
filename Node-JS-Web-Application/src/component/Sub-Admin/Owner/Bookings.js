import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentVehicleBookings } from '../../../actions/Sub-Admin/OwnerProfile';
import BookingItem from './BookingItem';
import Spinner from '../layout/spinner';

const Bookings = ({
  getCurrentVehicleBookings,
  profile: { profiles, loading },
  match
}) => {
  useEffect(() => {
    getCurrentVehicleBookings(match.params.id);
  }, [getCurrentVehicleBookings, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        Spinner
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Bookings & Feedbacks</h1>
          <p className='lead'>
            All booking of the vehicle are mentioned with Feedback and Rank from
            the Customer
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <BookingItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>{Spinner}</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Bookings.propTypes = {
  getCurrentVehicleBookings: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
});

export default connect(mapStateToProp, { getCurrentVehicleBookings })(Bookings);
