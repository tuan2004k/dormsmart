import api from '../config/fetch';
import { STUDENT_ENDPOINTS } from '../endpoints/studentEndpoints';

const studentService = {
  getAllStudents: async (params) => {
    return api.get(STUDENT_ENDPOINTS.GET_ALL, { params });
  },

  getStudentById: async (id) => {
    return api.get(STUDENT_ENDPOINTS.GET_BY_ID(id));
  },

  createStudent: async (studentData) => {
    const academicInfoString = studentData.get('academicInfo');
    console.log('academicInfoString (before parse):', academicInfoString);
    if (academicInfoString) {
      const academicInfo = JSON.parse(academicInfoString);
      console.log('academicInfo (after parse, before delete):', academicInfo);
      delete academicInfo.major;
      delete academicInfo.year;
      console.log('academicInfo (after delete):', academicInfo);
      studentData.set('academicInfo', JSON.stringify(academicInfo));
      console.log('academicInfoString (after stringify, before set):', JSON.stringify(academicInfo));
    }
    return api.post(STUDENT_ENDPOINTS.CREATE, studentData);
  },

  updateStudent: async (id, studentData) => {
    const academicInfoString = studentData.get('academicInfo');
    console.log('academicInfoString (before parse) for update:', academicInfoString);
    if (academicInfoString) {
      const academicInfo = JSON.parse(academicInfoString);
      console.log('academicInfo (after parse, before delete) for update:', academicInfo);
      delete academicInfo.major;
      delete academicInfo.year;
      console.log('academicInfo (after delete) for update:', academicInfo);
      studentData.set('academicInfo', JSON.stringify(academicInfo));
      console.log('academicInfoString (after stringify, before set) for update:', JSON.stringify(academicInfo));
    }
    return api.put(STUDENT_ENDPOINTS.UPDATE(id), studentData);
  },

  deleteStudent: async (id) => {
    return api.delete(STUDENT_ENDPOINTS.DELETE(id));
  },
};

export default studentService;
