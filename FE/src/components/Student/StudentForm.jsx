import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStudent, updateStudent, getStudentDetails } from '../../redux/actions/studentActions';

const StudentForm = ({ studentId, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      idCard: '',
      address: '',
    },
    studentId: '',
    academicInfo: {
      university: '',
      faculty: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    // documents: [], // Assuming documents will be handled separately
    status: 'active',
  });

  const studentDetails = useSelector((state) => state.studentDetails);
  const { student, loading, error } = studentDetails;

  const studentCreate = useSelector((state) => state.studentCreate);
  const { success: createSuccess } = studentCreate;

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { success: updateSuccess } = studentUpdate;

  useEffect(() => {
    if (studentId) {
      dispatch(getStudentDetails(studentId));
    }
  }, [dispatch, studentId]);

  useEffect(() => {
    if (studentId && student) {
      setFormData({
        personalInfo: {
          fullName: student.personalInfo?.fullName || '',
          email: student.personalInfo?.email || '',
          phone: student.personalInfo?.phone || '',
          dateOfBirth: student.personalInfo?.dateOfBirth ? student.personalInfo.dateOfBirth.split('T')[0] : '',
          gender: student.personalInfo?.gender || '',
          idCard: student.personalInfo?.idCard || '',
          address: student.personalInfo?.address || '',
        },
        studentId: student.studentId || '',
        academicInfo: {
          university: student.academicInfo?.university || '',
          faculty: student.academicInfo?.faculty || '',
        },
        emergencyContact: {
          name: student.emergencyContact?.name || '',
          relationship: student.emergencyContact?.relationship || '',
          phone: student.emergencyContact?.phone || '',
        },
        status: student.status || 'active',
      });
    }
  }, [studentId, student]);

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      onClose();
    }
  }, [createSuccess, updateSuccess, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('personalInfo.')) {
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [name.split('.')[1]]: value,
        },
      }));
    } else if (name.startsWith('academicInfo.')) {
      setFormData((prev) => ({
        ...prev,
        academicInfo: {
          ...prev.academicInfo,
          [name.split('.')[1]]: value,
        },
      }));
    } else if (name.startsWith('emergencyContact.')) {
      setFormData((prev) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    // Append top-level fields
    dataToSend.append('studentId', formData.studentId);
    dataToSend.append('status', formData.status);

    // Append nested objects as JSON strings
    dataToSend.append('personalInfo', JSON.stringify(formData.personalInfo));
    dataToSend.append('academicInfo', JSON.stringify(formData.academicInfo));
    dataToSend.append('emergencyContact', JSON.stringify(formData.emergencyContact));

    if (studentId) {
      dispatch(updateStudent(studentId, dataToSend));
    } else {
      dispatch(createStudent(dataToSend));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {studentId ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên mới'}
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Student ID and Status always take full width or adjust as needed */}
        <div className="mb-2">
          <label htmlFor="studentId" className="block text-gray-700 text-sm font-bold mb-2">Mã sinh viên</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Personal Info */}
        <h3 className="text-xl font-bold mt-4 mb-2">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
            <input
              type="text"
              id="personalInfo.fullName"
              name="personalInfo.fullName"
              value={formData.personalInfo.fullName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="personalInfo.email"
              name="personalInfo.email"
              value={formData.personalInfo.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
            <input
              type="text"
              id="personalInfo.phone"
              name="personalInfo.phone"
              value={formData.personalInfo.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Ngày sinh</label>
            <input
              type="date"
              id="personalInfo.dateOfBirth"
              name="personalInfo.dateOfBirth"
              value={formData.personalInfo.dateOfBirth}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="idCard" className="block text-gray-700 text-sm font-bold mb-2">CMND/CCCD</label>
            <input
              type="text"
              id="personalInfo.idCard"
              name="personalInfo.idCard"
              value={formData.personalInfo.idCard}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Giới tính</label>
            <select
              id="personalInfo.gender"
              name="personalInfo.gender"
              value={formData.personalInfo.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
          <div className="col-span-1 md:col-span-3">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ</label>
            <input
              type="text"
              id="personalInfo.address"
              name="personalInfo.address"
              value={formData.personalInfo.address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Academic Info */}
        <h3 className="text-xl font-bold mt-4 mb-2">Thông tin học vấn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="university" className="block text-gray-700 text-sm font-bold mb-2">Trường đại học</label>
            <input
              type="text"
              id="academicInfo.university"
              name="academicInfo.university"
              value={formData.academicInfo.university}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="faculty" className="block text-gray-700 text-sm font-bold mb-2">Khoa</label>
            <input
              type="text"
              id="academicInfo.faculty"
              name="academicInfo.faculty"
              value={formData.academicInfo.faculty}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <h3 className="text-xl font-bold mt-4 mb-2">Liên hệ khẩn cấp</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="emergencyName" className="block text-gray-700 text-sm font-bold mb-2">Tên người liên hệ</label>
            <input
              type="text"
              id="emergencyContact.name"
              name="emergencyContact.name"
              value={formData.emergencyContact.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="relationship" className="block text-gray-700 text-sm font-bold mb-2">Mối quan hệ</label>
            <input
              type="text"
              id="emergencyContact.relationship"
              name="emergencyContact.relationship"
              value={formData.emergencyContact.relationship}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="emergencyPhone" className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại liên hệ</label>
            <input
              type="text"
              id="emergencyContact.phone"
              name="emergencyContact.phone"
              value={formData.emergencyContact.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Status (always full width) */}
        <div className="mb-2 mt-4">
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Trạng thái</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="active">Đang hoạt động</option>
            <option value="graduated">Đã tốt nghiệp</option>
            <option value="dropped">Đã thôi học</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {studentId ? 'Cập nhật' : 'Thêm mới'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
