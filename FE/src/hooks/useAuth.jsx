import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../redux/actions/authActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const handleLogin = (credentials) => {
    dispatch(login(credentials));
  };

  const handleRegister = (userData) => {
    dispatch(register(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return { userInfo, loading, error, handleLogin, handleRegister, handleLogout };
};

export default useAuth;