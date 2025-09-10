import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listStudents, deleteStudent } from '../../redux/actions/studentActions';
import StudentDetailView from './StudentDetailView'; // Import the new component name

const StudentList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const studentList = useSelector(state => state.studentList);
  const { loading, error, students } = studentList;

  const studentDelete = useSelector(state => state.studentDelete);
  const studentCreate = useSelector(state => state.studentCreate);
  const studentUpdate = useSelector(state => state.studentUpdate);

  const { success: deleteSuccess } = studentDelete;
  const { success: createSuccess } = studentCreate;
  const { success: updateSuccess } = studentUpdate;

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch, deleteSuccess, createSuccess, updateSuccess]);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleToggleDetails = (id) => {
    setExpandedStudentId(expandedStudentId === id ? null : id);
  };

  const ActionButtons = ({ student }) => (
    <div className="space-x-1">
      <button
        onClick={() => handleToggleDetails(student._id)}
        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
      >
        Chi tiết
      </button>
      <button
        onClick={() => onEdit(student._id)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
      >
        Sửa
      </button>
      <button
        onClick={() => handleDelete(student._id)}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
      >
        Xóa
      </button>
    </div>
  );

  const TableRow = ({ student }) => (
    <React.Fragment key={student._id}>
      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => handleToggleDetails(student._id)}>
        <td className="py-3 px-4 border-b text-sm">{student._id}</td>
        <td className="py-3 px-4 border-b text-sm font-medium">{student.studentId}</td>
        <td className="py-3 px-4 border-b text-sm">{student.personalInfo?.fullName}</td>
        <td className="py-3 px-4 border-b text-sm">{student.personalInfo?.email}</td>
        <td className="py-3 px-4 border-b text-sm">{student.personalInfo?.phone}</td>
        <td className="py-3 px-4 border-b text-sm">
          <span className={`px-2 py-1 rounded-full text-xs ${student.status === 'active' ? 'bg-green-100 text-green-800' :
            student.status === 'graduated' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
            {student.status === 'active' ? 'Hoạt động' :
              student.status === 'graduated' ? 'Tốt nghiệp' : 'Thôi học'}
          </span>
        </td>
        <td className="py-3 px-4 border-b text-sm">
          <ActionButtons student={student} />
        </td>
      </tr>
      {expandedStudentId === student._id && (
        <tr>
          <td colSpan="7" className="p-4 bg-gray-50">
            <div className="bg-white shadow rounded-lg p-4">
              <StudentDetailView
                studentId={student._id}
                onClose={() => setExpandedStudentId(null)}
              />
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );

  if (loading) return <div className="text-center py-4">Đang tải...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Lỗi: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Danh sách sinh viên ({students?.length || 0})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['ID', 'Mã SV', 'Họ tên', 'Email', 'SĐT', 'Trạng thái', 'Thao tác'].map(header => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students && Array.isArray(students) && students.length > 0 ? (
              students.map(student => <TableRow key={student._id} student={student} />)
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"></path>
                    </svg>
                    <p className="text-lg font-medium">Chưa có sinh viên nào</p>
                    <p className="text-sm text-gray-400">Hãy thêm sinh viên đầu tiên</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;