import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudentDetails } from '../../redux/actions/studentActions';

const StudentDetailsModal = ({ studentId, onClose }) => {
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.studentDetails);
  const { student, loading, error } = studentDetails;

  useEffect(() => {
    if (studentId) {
      dispatch(getStudentDetails(studentId));
    }
  }, [dispatch, studentId]);

  if (!studentId) return null; // Don't render if no studentId

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Thông tin chi tiết sinh viên</h2>

        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi: {error}</p>
        ) : student ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><span className="font-semibold">ID:</span> {student._id}</p>
              <p><span className="font-semibold">Mã sinh viên:</span> {student.studentId}</p>
              <p><span className="font-semibold">Họ và tên:</span> {student.personalInfo?.fullName}</p>
              <p><span className="font-semibold">Email:</span> {student.personalInfo?.email}</p>
              <p><span className="font-semibold">Số điện thoại:</span> {student.personalInfo?.phone}</p>
              <p><span className="font-semibold">Ngày sinh:</span> {student.personalInfo?.dateOfBirth ? new Date(student.personalInfo.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
              <p><span className="font-semibold">Giới tính:</span> {student.personalInfo?.gender}</p>
              <p><span className="font-semibold">Địa chỉ:</span> {student.personalInfo?.address}</p>
            </div>
            <div>
              <p><span className="font-semibold">Trường đại học:</span> {student.academicInfo?.university}</p>
              <p><span className="font-semibold">Khoa:</span> {student.academicInfo?.faculty}</p>
              <p><span className="font-semibold">Liên hệ khẩn cấp:</span> {student.emergencyContact?.name} ({student.emergencyContact?.relationship}) - {student.emergencyContact?.phone}</p>
              <p><span className="font-semibold">Trạng thái:</span> {student.status}</p>
              <p><span className="font-semibold">Tạo lúc:</span> {new Date(student.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <p>Không tìm thấy thông tin sinh viên.</p>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsModal;
