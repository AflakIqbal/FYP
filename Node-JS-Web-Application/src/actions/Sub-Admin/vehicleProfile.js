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
    const res = await axios.get('/api/subAdmin/viewVehicle');

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
    const res = await axios.get(`/api/subAdmin/viewVehicleById/${userID}`);

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
export const deleteVehicleForSubAdmin = vehicleId => async dispatch => {
  if (window.confirm('Are you sure? This can not be undone')) {
    try {
      await axios.delete(`/api/subAdmin/deleteVehicle/${vehicleId}`);

      dispatch({
        type: SUBADMIN_VEHICLE_DELETED,
        payload: vehicleId
      });

      dispatch(setAlert('Vehicle deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statustext, status: err.response.status }
      });
    }
  }
};
