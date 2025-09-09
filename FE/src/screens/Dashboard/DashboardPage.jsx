import React from "react";
import { useSelector } from "react-redux";


const DashboardPage = () => {
  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <p>Đây là khu vực nội dung chính của Dashboard.</p>

    </div>
  );
};

export default DashboardPage;
