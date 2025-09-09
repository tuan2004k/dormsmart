import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../screens/auth/LoginPage';
import RegisterPage from '../screens/auth/RegisterPage';
import DashboardPage from '../screens/Dashboard/DashboardPage';
import StudentPage from '../screens/Student/StudentPage'; // Import StudentPage
import DashboardLayout from '../components/Common/Layouts/Layout'; // Update import path

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={
                        <DashboardLayout>
                            <DashboardPage />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="/students"
                    element={
                        <DashboardLayout>
                            <StudentPage />
                        </DashboardLayout>
                    }
                />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
