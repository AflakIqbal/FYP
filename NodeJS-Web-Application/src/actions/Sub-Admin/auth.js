import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_IS_SUBADMIN
} from './types';

// Load User
export const loadSubAdmin = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/subAdmin/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    dispatch({ type: USER_IS_SUBADMIN });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//register user
export const register = ({
  name,
  email,
  password,
  cellPhone,
  address,
  officeLocation,
  photo
}) => async dispatch => {
  const config = {
    headers: {
      'content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    name,
    email,
    password,
    cellPhone,
    address,
    officeLocation
  });

  try {
    const res = await axios.post('/api/subAdmin/register', body, config);
    console.log('photo', photo);
    console.log('photo', cellPhone);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadSubAdmin());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({
    email,
    password
  });

  try {
    const res = await axios.post('/api/subAdmin/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadSubAdmin());
    dispatch({ type: USER_IS_SUBADMIN });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// logout / clear
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
