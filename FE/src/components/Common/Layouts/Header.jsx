import React from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3 border-b">
      <div className="flex items-center space-x-3">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900 focus:outline-none">
          <FaBars className="text-lg cursor-pointer" />
        </button>
        <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-gray-800">
          Dormitory Management
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Notification */}
        <button className="relative text-gray-600 hover:text-gray-900">
          <FaBell className="text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-600">
          <FaUserCircle className="text-2xl" />
          <span className="font-medium">{userInfo?.role || 'Guest'}</span>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
