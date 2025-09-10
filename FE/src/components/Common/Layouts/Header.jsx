import React, { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaSearch,
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
  FaHome
} from "react-icons/fa";
import {
  useSelector,
  useDispatch
}
  from 'react-redux';
import {
  logout
}
  from '../../../redux/actions/authActions';
import {
  useNavigate
} from 'react-router-dom';
import Logo from '../../../assets/Logo.png';

const Header = ({ toggleSidebar }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  const notifications = [
    {
      id: 1,
      title: "Yêu cầu bảo trì phòng 101",
      message: "Sinh viên báo cáo vòi nước bị hỏng",
      time: "2 phút trước",
      type: "maintenance",
      unread: true
    },
    {
      id: 2,
      title: "Đăng ký phòng mới",
      message: "Có 3 sinh viên mới đăng ký phòng",
      time: "15 phút trước",
      type: "registration",
      unread: true
    },
    {
      id: 3,
      title: "Thanh toán tiền phòng",
      message: "Sinh viên Nguyễn Văn A đã thanh toán tiền phòng tháng 9",
      time: "1 giờ trước",
      type: "payment",
      unread: false
    },
    {
      id: 4,
      title: "Báo cáo occupancy",
      message: "Tầng 3 đã hết chỗ trống",
      time: "2 giờ trước",
      type: "report",
      unread: true
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
  };

  const handleSettings = () => {
    navigate('/settings');
    setIsUserMenuOpen(false);
  };

  const handleHome = () => {
    navigate('/dashboard');
    setIsUserMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add your dark mode logic here
    document.documentElement.classList.toggle('dark');
  };

  const getNotificationIcon = (type) => {
    const iconClass = "w-3 h-3 text-white";
    switch (type) {
      case 'maintenance': return <FaCog className={iconClass} />;
      case 'registration': return <FaUser className={iconClass} />;
      case 'payment': return <FaBell className={iconClass} />;
      case 'report': return <FaHome className={iconClass} />;
      default: return <FaBell className={iconClass} />;
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case 'maintenance': return 'bg-yellow-500';
      case 'registration': return 'bg-green-500';
      case 'payment': return 'bg-blue-500';
      case 'report': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handleNotificationClick = (notificationId) => {
    // Handle notification click - mark as read, navigate, etc.
    console.log('Notification clicked:', notificationId);
    setIsNotificationOpen(false);
  };

  const markAllAsRead = () => {
    // Logic to mark all notifications as read
    console.log('Mark all notifications as read');
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white shadow-lg px-4 sm:px-6 py-3 border-b border-gray-200 backdrop-blur-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle sidebar"
        >
          <FaBars className="text-lg" />
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <img
              src={Logo}
              alt="Logo"
              className="h-15 w-15 sm:h-20 sm:w-20 "
            />
            {/* <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div> */}
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xxl ont-weight: 700  ">
              Dormitory Management
            </h1>
            <p className="text-xs text-gray-500 hidden md:block">Hệ thống quản lý ký túc xá</p>
          </div>
        </div>
      </div>

      {/* Center - Search Bar (Hidden on small screens) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Tìm kiếm phòng, sinh viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <button
          onClick={toggleDarkMode}
          className="hidden sm:flex text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <FaSun className="text-lg text-yellow-500" /> : <FaMoon className="text-lg" />}
        </button>
        <button className="lg:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <FaSearch className="text-lg" />
        </button>

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Notifications (${unreadCount} unread)`}
          >
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium animate-pulse shadow-md">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 max-h-96 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Thông báo</h3>
                    <p className="text-sm text-gray-500">{unreadCount} thông báo chưa đọc</p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Đánh dấu đã đọc
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 transition-colors ${notification.unread ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
                      }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getNotificationBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${notification.unread ? 'font-semibold text-gray-900' : 'text-gray-700'} truncate`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1 rounded-lg hover:bg-blue-50 transition-colors">
                  Xem tất cả thông báo
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="User menu"
          >
            <div className="relative">
              <FaUserCircle className="text-xl sm:text-2xl text-blue-600" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden sm:block text-left">
              <p className="font-medium text-sm leading-tight truncate max-w-20">
                {userInfo?.name || userInfo?.username || 'Admin'}
              </p>
            </div>
            <FaChevronDown className={`text-sm transition-transform duration-200 hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="font-semibold text-gray-800 truncate">
                  {userInfo?.name || userInfo?.username || 'Admin User'}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {userInfo?.email || 'admin@dormitory.com'}
                </p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-2">
                  {userInfo?.role || 'Administrator'}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={handleHome}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors duration-150"
                >
                  <FaHome className="text-sm text-gray-500" />
                  <span>Trang chủ</span>
                </button>

                <button
                  onClick={handleProfile}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors duration-150"
                >
                  <FaUser className="text-sm text-gray-500" />
                  <span>Thông tin cá nhân</span>
                </button>

                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors duration-150"
                >
                  <FaCog className="text-sm text-gray-500" />
                  <span>Cài đặt</span>
                </button>
              </div>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150 font-medium"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;