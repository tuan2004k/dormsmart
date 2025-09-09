import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listStudents, deleteStudent } from '../../redux/actions/studentActions';

const StudentList = ({ onEdit, onViewDetails }) => {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  const studentDelete = useSelector((state) => state.studentDelete);
  const { success: deleteSuccess } = studentDelete;

  const studentCreate = useSelector((state) => state.studentCreate);
  const { success: createSuccess } = studentCreate;

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { success: updateSuccess } = studentUpdate;

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch, deleteSuccess, createSuccess, updateSuccess]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách sinh viên</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th><th className="py-2 px-4 border-b">Mã sinh viên</th> {/* Add Student ID column */}<th className="py-2 px-4 border-b">Tên</th><th className="py-2 px-4 border-b">Email</th><th className="py-2 px-4 border-b">Số điện thoại</th><th className="py-2 px-4 border-b">Trạng thái</th> {/* Add Status column */}<th className="py-2 px-4 border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students && Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td className="py-2 px-4 border-b">{student._id}</td><td className="py-2 px-4 border-b">{student.studentId}</td> {/* Display Student ID */}<td className="py-2 px-4 border-b">{student.personalInfo?.fullName}</td><td className="py-2 px-4 border-b">{student.personalInfo?.email}</td><td className="py-2 px-4 border-b">{student.personalInfo?.phone}</td><td className="py-2 px-4 border-b">{student.status}</td> {/* Display Status */}<td className="py-2 px-4 border-b">
                    <button
                      onClick={() => onViewDetails(student._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => onEdit(student._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-center text-gray-500"> {/* Adjusted colspan */}
                  Không có sinh viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
