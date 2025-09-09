import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import {
  studentListReducer,
  studentDetailsReducer,
  studentCreateReducer,
  studentUpdateReducer,
  studentDeleteReducer,
} from './studentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  studentList: studentListReducer,
  studentDetails: studentDetailsReducer,
  studentCreate: studentCreateReducer,
  studentUpdate: studentUpdateReducer,
  studentDelete: studentDeleteReducer,
  // Add other reducers here
});

export default rootReducer;
