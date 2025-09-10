import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStudent, updateStudent, getStudentDetails } from '../../redux/actions/studentActions';

const FormSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h3>
    {children}
  </div>
);

const InputField = ({ label, name, type = "text", value, onChange, required = false, options = null, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    )}
  </div>
);

const StudentForm = ({ studentId, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '', email: '', phone: '', dateOfBirth: '',
      gender: '', idCard: '', address: ''
    },
    studentId: '',
    academicInfo: { university: '', faculty: '' },
    emergencyContact: { name: '', relationship: '', phone: '' },
    status: 'active'
  });

  const { student, loading, error } = useSelector(state => state.studentDetails);
  const { success: createSuccess } = useSelector(state => state.studentCreate);
  const { success: updateSuccess } = useSelector(state => state.studentUpdate);

  useEffect(() => {
    if (studentId) dispatch(getStudentDetails(studentId));
  }, [dispatch, studentId]);

  useEffect(() => {
    if (studentId && student) {
      setFormData({
        personalInfo: {
          fullName: student.personalInfo?.fullName || '',
          email: student.personalInfo?.email || '',
          phone: student.personalInfo?.phone || '',
          dateOfBirth: student.personalInfo?.dateOfBirth?.split('T')[0] || '',
          gender: student.personalInfo?.gender || '',
          idCard: student.personalInfo?.idCard || '',
          address: student.personalInfo?.address || ''
        },
        studentId: student.studentId || '',
        academicInfo: {
          university: student.academicInfo?.university || '',
          faculty: student.academicInfo?.faculty || ''
        },
        emergencyContact: {
          name: student.emergencyContact?.name || '',
          relationship: student.emergencyContact?.relationship || '',
          phone: student.emergencyContact?.phone || ''
        },
        status: student.status || 'active'
      });
    }
  }, [studentId, student]);

  useEffect(() => {
    if (createSuccess || updateSuccess) onClose();
  }, [createSuccess, updateSuccess, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.includes('.') ? name.split('.') : [null, name];

    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();

    dataToSend.append('studentId', formData.studentId);
    dataToSend.append('status', formData.status);
    dataToSend.append('personalInfo', JSON.stringify(formData.personalInfo));
    dataToSend.append('academicInfo', JSON.stringify(formData.academicInfo));
    dataToSend.append('emergencyContact', JSON.stringify(formData.emergencyContact));

    if (studentId) {
      dispatch(updateStudent(studentId, dataToSend));
    } else {
      dispatch(createStudent(dataToSend));
    }
  };

  const genderOptions = [
    { value: "", label: "Chọn giới tính" },
    { value: "Male", label: "Nam" },
    { value: "Female", label: "Nữ" },
    { value: "Other", label: "Khác" }
  ];

  const statusOptions = [
    { value: "active", label: "Đang hoạt động" },
    { value: "graduated", label: "Đã tốt nghiệp" },
    { value: "dropped", label: "Đã thôi học" }
  ];

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Lỗi: {error}</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {studentId ? 'Chỉnh sửa sinh viên' : 'Thêm sinh viên mới'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Thông tin cơ bản">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Mã sinh viên"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
            <InputField
              label="Trạng thái"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />
          </div>
        </FormSection>

        <FormSection title="Thông tin cá nhân">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="Họ và tên"
              name="personalInfo.fullName"
              value={formData.personalInfo.fullName}
              onChange={handleChange}
              required
              className="md:col-span-2 lg:col-span-1"
            />
            <InputField
              label="Email"
              name="personalInfo.email"
              type="email"
              value={formData.personalInfo.email}
              onChange={handleChange}
            />
            <InputField
              label="Số điện thoại"
              name="personalInfo.phone"
              value={formData.personalInfo.phone}
              onChange={handleChange}
            />
            <InputField
              label="Ngày sinh"
              name="personalInfo.dateOfBirth"
              type="date"
              value={formData.personalInfo.dateOfBirth}
              onChange={handleChange}
            />
            <InputField
              label="CMND/CCCD"
              name="personalInfo.idCard"
              value={formData.personalInfo.idCard}
              onChange={handleChange}
            />
            <InputField
              label="Giới tính"
              name="personalInfo.gender"
              value={formData.personalInfo.gender}
              onChange={handleChange}
              options={genderOptions}
            />
          </div>
          <InputField
            label="Địa chỉ"
            name="personalInfo.address"
            value={formData.personalInfo.address}
            onChange={handleChange}
          />
        </FormSection>

        <FormSection title="Thông tin học vấn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Trường đại học"
              name="academicInfo.university"
              value={formData.academicInfo.university}
              onChange={handleChange}
            />
            <InputField
              label="Khoa"
              name="academicInfo.faculty"
              value={formData.academicInfo.faculty}
              onChange={handleChange}
            />
          </div>
        </FormSection>

        {/* Emergency Contact */}
        <FormSection title="Liên hệ khẩn cấp">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Tên người liên hệ"
              name="emergencyContact.name"
              value={formData.emergencyContact.name}
              onChange={handleChange}
            />
            <InputField
              label="Mối quan hệ"
              name="emergencyContact.relationship"
              value={formData.emergencyContact.relationship}
              onChange={handleChange}
            />
            <InputField
              label="Số điện thoại liên hệ"
              name="emergencyContact.phone"
              value={formData.emergencyContact.phone}
              onChange={handleChange}
            />
          </div>
        </FormSection>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {studentId ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;