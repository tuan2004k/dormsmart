import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentDetails } from '../../redux/actions/studentActions';

const StudentDetailView = ({ studentId }) => {
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.studentDetails);
  const { student, loading, error } = studentDetails;

  useEffect(() => {
    if (studentId) {
      dispatch(getStudentDetails(studentId));
    }
  }, [dispatch, studentId]);

  if (!studentId) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Thông tin chi tiết</h3>

      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="text-red-500">Lỗi: {error}</p>
      ) : student ? (
        <div className="space-y-6">
          {/* General Information */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Thông tin chung</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-semibold">ID:</span> {student._id}</p>
              <p><span className="font-semibold">Mã sinh viên:</span> {student.studentId}</p>
              <p><span className="font-semibold">Trạng thái:</span> {student.status}</p>
              <p><span className="font-semibold">Tạo lúc:</span> {student.createdAt && !isNaN(new Date(student.createdAt).getTime()) ? new Date(student.createdAt).toLocaleString() : 'N/A'}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Thông tin cá nhân</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-semibold">Họ và tên:</span> {student.personalInfo?.fullName}</p>
              <p><span className="font-semibold">Email:</span> {student.personalInfo?.email}</p>
              <p><span className="font-semibold">Số điện thoại:</span> {student.personalInfo?.phone}</p>
              <p><span className="font-semibold">Ngày sinh:</span> {student.personalInfo?.dateOfBirth && !isNaN(new Date(student.personalInfo.dateOfBirth).getTime()) ? new Date(student.personalInfo.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
              <p><span className="font-semibold">Giới tính:</span> {student.personalInfo?.gender}</p>
              <p><span className="font-semibold">Địa chỉ:</span> {student.personalInfo?.address}</p>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Thông tin học vấn</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-semibold">Trường đại học:</span> {student.academicInfo?.university}</p>
              <p><span className="font-semibold">Khoa:</span> {student.academicInfo?.faculty}</p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Liên hệ khẩn cấp</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-semibold">Tên:</span> {student.emergencyContact?.name}</p>
              <p><span className="font-semibold">Quan hệ:</span> {student.emergencyContact?.relationship}</p>
              <p><span className="font-semibold">Số điện thoại:</span> {student.emergencyContact?.phone}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Không tìm thấy thông tin sinh viên.</p>
      )}
    </div>
  );
};

export default StudentDetailView;
