import React from 'react';
import PropTypes from 'prop-types';

const BookingItem = ({
  profile: { _id, owner, customer, days, date, ownerFeedback, cusomterFeedback }
}) => {
  var name = 'no customer';
  if (customer) {
    name = customer.name;
  }
  var feedback = 'no feedback';
  if (ownerFeedback) {
    feedback = ownerFeedback.feedback;
  }
  var rate = 'no rating';
  if (ownerFeedback) {
    rate = ownerFeedback.rating;
  }
  return (
    <div className='profile2 bg-light'>
      <div>
        <h4 className='bookingHeading'>Booking ID : {_id}</h4>
        <p>
          {name} book the vehicle on{' '}
          {date && <span> {date.trim().split('T')[0]} </span>} for{' '}
          {days && <span> {days} </span>} days
        </p>
        <h5>Feedback by {name}</h5>
        <p>{feedback}</p>

        {/* <p>{transmission}</p>
        <Link to={`/Bookings/${_id}`} className='btn btn-primary'>
          Bookings
        </Link> */}
      </div>
      <ul>
        <li className='text-primary'>
          <i className='fas fa-balance-scale'></i>{' '}
          {rate && <span>Rate by {name}</span>}{' '}
        </li>
        <li className='text-primary'>
          {rate && <span> {'5 /'}</span>}
          {rate && <span>{rate}</span>} <i className='fas fa-star'></i>
        </li>
      </ul>
    </div>
  );
};

BookingItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default BookingItem;
