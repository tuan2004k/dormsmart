import React, { useState } from 'react';
import StudentList from '../../components/Student/StudentList';
import StudentForm from '../../components/Student/StudentForm';

const StudentPage = () => {
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateNew = () => {
    setEditingStudentId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingStudentId(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStudentId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
              Quản lý sinh viên
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Quản lý thông tin sinh viên, thêm mới, chỉnh sửa và xem chi tiết
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Thêm sinh viên
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {showForm && (
            <div className="bg-white shadow rounded-lg p-6">
              <StudentForm
                studentId={editingStudentId}
                onClose={handleCloseForm}
              />
            </div>
          )}

          <StudentList
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;