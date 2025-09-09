import {
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  STUDENT_CREATE_REQUEST,
  STUDENT_CREATE_SUCCESS,
  STUDENT_CREATE_FAIL,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL,
  STUDENT_DELETE_REQUEST,
  STUDENT_DELETE_SUCCESS,
  STUDENT_DELETE_FAIL,
} from '../actions/studentActions';

const initialState = {
  students: [],
  student: null,
  loading: false,
  error: null,
  success: false,
};

export const studentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case STUDENT_LIST_SUCCESS:
      return { ...state, loading: false, students: action.payload, error: null };
    case STUDENT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload, students: [] };
    default:
      return state;
  }
};

export const studentDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case STUDENT_DETAILS_SUCCESS:
      return { ...state, loading: false, student: action.payload, error: null };
    case STUDENT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload, student: null };
    default:
      return state;
  }
};

export const studentCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_CREATE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case STUDENT_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, student: action.payload, error: null };
    case STUDENT_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const studentUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case STUDENT_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true, student: action.payload, error: null };
    case STUDENT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const studentDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_DELETE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case STUDENT_DELETE_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case STUDENT_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
