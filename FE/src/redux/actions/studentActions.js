import studentService from '../../apis/services/studentService';

export const STUDENT_LIST_REQUEST = 'STUDENT_LIST_REQUEST';
export const STUDENT_LIST_SUCCESS = 'STUDENT_LIST_SUCCESS';
export const STUDENT_LIST_FAIL = 'STUDENT_LIST_FAIL';

export const STUDENT_DETAILS_REQUEST = 'STUDENT_DETAILS_REQUEST';
export const STUDENT_DETAILS_SUCCESS = 'STUDENT_DETAILS_SUCCESS';
export const STUDENT_DETAILS_FAIL = 'STUDENT_DETAILS_FAIL';

export const STUDENT_CREATE_REQUEST = 'STUDENT_CREATE_REQUEST';
export const STUDENT_CREATE_SUCCESS = 'STUDENT_CREATE_SUCCESS';
export const STUDENT_CREATE_FAIL = 'STUDENT_CREATE_FAIL';

export const STUDENT_UPDATE_REQUEST = 'STUDENT_UPDATE_REQUEST';
export const STUDENT_UPDATE_SUCCESS = 'STUDENT_UPDATE_SUCCESS';
export const STUDENT_UPDATE_FAIL = 'STUDENT_UPDATE_FAIL';

export const STUDENT_DELETE_REQUEST = 'STUDENT_DELETE_REQUEST';
export const STUDENT_DELETE_SUCCESS = 'STUDENT_DELETE_SUCCESS';
export const STUDENT_DELETE_FAIL = 'STUDENT_DELETE_FAIL';

export const listStudents = (params) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });
    const { data } = await studentService.getAllStudents(params);
    dispatch({ type: STUDENT_LIST_SUCCESS, payload: data.students });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getStudentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });
    const { data } = await studentService.getStudentById(id);
    dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: data.student });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createStudent = (studentData) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_CREATE_REQUEST });
    const { data } = await studentService.createStudent(studentData);
    dispatch({ type: STUDENT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateStudent = (id, studentData) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_UPDATE_REQUEST });
    const { data } = await studentService.updateStudent(id, studentData);
    dispatch({ type: STUDENT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STUDENT_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_DELETE_REQUEST });
    await studentService.deleteStudent(id);
    dispatch({ type: STUDENT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: STUDENT_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
