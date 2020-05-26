import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../../actions/Sub-Admin/OwnerProfile';
import Spinner from '../layout/spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import OwnerVehicle from './VehicleOwner';

const OwnerById = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/SubAdminOwners' className='btn btn-light'>
            Back To Owners
          </Link>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <h3 className='tagOfRegisteredVehicles'>Registered Vehicles</h3>
            <OwnerVehicle pro={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
OwnerById.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(OwnerById);
