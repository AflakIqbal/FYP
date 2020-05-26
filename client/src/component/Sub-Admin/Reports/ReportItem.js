import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from '../../../img/download.jpg';
import { connect } from 'react-redux';
import { deleteVehicleForSubAdmin } from '../../../actions/Sub-Admin/vehicleProfile';

const VehicleItem = ({
  profile: { _id, owner, customer, report, transmission },
  deleteVehicleForSubAdmin
}) => {
  var OwnerName = '';
  if (owner) {
    OwnerName = owner.name;
  }

  var CustomerName = '';
  if (customer) {
    CustomerName = customer.name;
  }

  return (
    <div className='profile3 bg-light'>
      <h4 className='bookingHeading'>Report ID : {_id}</h4>
      <p>
        {OwnerName} submit A report against
        {CustomerName && <span> {CustomerName} </span>}
      </p>

      <h5>{OwnerName} complain </h5>
      <p>{report}</p>

      {/* <p>{transmission}</p>
        <Link to={`/Bookings/${_id}`} className='btn btn-primary'>
          Bookings
        </Link> */}
    </div>
  );
};

VehicleItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteVehicleForSubAdmin: PropTypes.func.isRequired
};

export default connect(null, {
  deleteVehicleForSubAdmin
})(VehicleItem);
