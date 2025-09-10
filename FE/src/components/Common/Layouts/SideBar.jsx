import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserGraduate, FaBuilding, FaFileContract, FaMoneyBill, FaChartBar, FaTimes } from "react-icons/fa"; // Import FaTimes for close icon

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Students", path: "/students", icon: <FaUserGraduate /> },
    { name: "Rooms", path: "/rooms", icon: <FaBuilding /> },
    { name: "Contracts", path: "/contracts", icon: <FaFileContract /> },
    { name: "Payments", path: "/payments", icon: <FaMoneyBill /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white shadow-lg transform cursor-pointer  ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0 overflow-hidden"}
        transition-all duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
        <h2 className="text-lg font-semibold">🏠 Dormitory</h2>
        <button onClick={toggleSidebar} className="text-white focus:outline-none cursor-pointer">
          <FaTimes className="text-xl" />
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 space-x-3 hover:bg-gray-700 ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
