import {
  GET_PROFILES,
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  SUBADMIN_VEHICLE_DELETED
} from '../actions/Sub-Admin/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case SUBADMIN_VEHICLE_DELETED:
      return {
        ...state,
        loading: false,
        errors: null,
        profiles: [...state.profiles.filter(item => item._id !== payload)]
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: null
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
