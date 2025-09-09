import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import authService from '../../apis/services/authService';

const RegisterPage = () => {
  const handleRegister = async (userData) => {
    try {
      const response = await authService.register(userData);
      console.log('Đăng ký thành công:', response.data);

    } catch (error) {
      console.error('Lỗi đăng ký:', error.response?.data?.message || error.message);

    }
  };

  return (
    <div className="register-page">
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
