import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/authActions';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload, error: null };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload, userInfo: null };
    case LOGOUT:
      return { ...state, userInfo: null, error: null };
    default:
      return state;
  }
};
