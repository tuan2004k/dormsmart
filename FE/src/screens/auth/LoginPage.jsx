import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loading, error, userInfo, handleLogin } = useAuth(); 

  const onLoginSubmit = async (credentials) => {
    await handleLogin(credentials);
    if (userInfo) { 
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      {loading && <p>Đang đăng nhập...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LoginForm onLogin={onLoginSubmit} />
    </div>
  );
};

export default LoginPage;