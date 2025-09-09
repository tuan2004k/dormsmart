import React, { useState } from 'react';
import StudentList from '../../components/Student/StudentList';
import StudentForm from '../../components/Student/StudentForm';
import StudentDetailsModal from '../../components/Student/StudentDetailsModal'; 

const StudentPage = () => {
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [viewingStudentId, setViewingStudentId] = useState(null); 

  const resetForm = () => {
    setEditingStudentId(null);
  };

  const handleEditStudent = (id) => {
    setEditingStudentId(id);
  };

  const handleViewStudentDetails = (id) => {
    setViewingStudentId(id);
  };

  const handleCloseDetailsModal = () => {
    setViewingStudentId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quản lý sinh viên</h1>
      <StudentForm studentId={editingStudentId} onClose={resetForm} />
      <div className="mt-8">
        <StudentList onEdit={handleEditStudent} onViewDetails={handleViewStudentDetails} />
      </div>

      {viewingStudentId && (
        <StudentDetailsModal
          studentId={viewingStudentId}
          onClose={handleCloseDetailsModal}
        />
      )}
    </div>
  );
};

export default StudentPage;
