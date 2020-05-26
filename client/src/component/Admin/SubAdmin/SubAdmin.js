import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../../actions/Admin/SubAdminProfile';
import SubAdminItem from './SubAdminItem';
import Spinner from '../layout/spinner';

const SubAdmin = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        Spinner
      ) : (
        <Fragment>
          <h1 className='large text-primary'>SubAdmins</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i>
            Browse and connect with SubAdmins
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <SubAdminItem key={profile._id} profile={profile} />
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

SubAdmin.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
});

export default connect(mapStateToProp, { getProfiles })(SubAdmin);
