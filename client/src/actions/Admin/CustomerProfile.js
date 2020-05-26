import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILE,
  SUBADMIN_VEHICLE_DELETED
} from './types';

// Get all current profile
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/Admin/viewCustomer');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
      //payload: { msg: err.response.statustext, status: err.response.status }
    });
  }
};

// Get all profile by id
export const getProfileById = userID => async dispatch => {
  try {
    const res = await axios.get(`/api/Admin/viewCustomerById/${userID}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statustext, status: err.response.status }
    });
  }
};

// Delete vehicle for subadmin
export const deleteCustomerForSubAdmin = customerId => async dispatch => {
  if (window.confirm('Are you sure? This can not be undone')) {
    try {
      await axios.delete(`/api/Admin/deleteCustomer/${customerId}`);

      dispatch({
        type: SUBADMIN_VEHICLE_DELETED,
        payload: customerId
      });

      dispatch(setAlert('Customer deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statustext, status: err.response.status }
      });
    }
  }
};
