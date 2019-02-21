import {
    AUTH_USER,
    UNAUTH_USER,
    FETCH_PROFILE,
  } from '../actions/auth/types';
  
  const initialState = {
      authenticated: false,
      profile: {},
      errors: {}
  };
  
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTH_USER:
          return {...state, errors: '', authenticated: true };
      case UNAUTH_USER:
          return {...state, authenticated: false, profile: {}};
      case FETCH_PROFILE:
          return {...state, profile: action.payload};
      default:
          return state;
    }
  };
  
  export default authReducer;