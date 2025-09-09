import api from '../config/fetch';
import { AUTH_ENDPOINTS } from '../endpoints'; 

const authService = {
  register: async (userData) => {
    const formData = new FormData();
    for (const key in userData) {
      if (key === 'avatar' && userData[key]) {
        formData.append(key, userData[key]);
      } else if (typeof userData[key] === 'object' && userData[key] !== null) {
        formData.append(key, JSON.stringify(userData[key]));
      } else {
        formData.append(key, userData[key]);
      }
    }
    return api.post(AUTH_ENDPOINTS.REGISTER, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  login: async (credentials) => {
    return api.post(AUTH_ENDPOINTS.LOGIN, credentials);
  },

  logout: async () => {
    return api.post(AUTH_ENDPOINTS.LOGOUT);
  },

  refreshToken: async () => {
    return api.post(AUTH_ENDPOINTS.REFRESH);
  },
};

export default authService;
