export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
};

export const USER_ENDPOINTS = {
  GET_BY_ID: (id) => `/users/${id}`,
};

export const STUDENT_ENDPOINTS = {
    GET_ALL: '/students',
    GET_BY_ID: (id) => `/students/${id}`,
    CREATE: '/students',
    UPDATE: (id) => `/students/${id}`,
    DELETE: (id) => `/students/${id}`,
  };