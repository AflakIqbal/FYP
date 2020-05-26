import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../../actions/Sub-Admin/ReportProfile';
import ReportItem from './ReportItem';
import Spinner from '../layout/spinner';

const Report = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        Spinner
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Reports</h1>

          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ReportItem key={profile._id} profile={profile} />
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

Report.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  profile: state.profile
});

export default connect(mapStateToProp, { getProfiles })(Report);
