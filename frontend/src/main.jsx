// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App';

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import NotFound from './pages/NotFound';

import StudentDashboard from './pages/student/Dashboard';
import StudentSchedule from './pages/student/Schedule';
import StudentStatus from './pages/student/Status';
import StudentProfile from './pages/student/Profile';
import StudentLayout from './layouts/StudentLayout';
import StudentChangePassword from './pages/student/ChangePassword';

import FacultyLayout from './layouts/FacultyLayout';
import FacultyDashboard from './pages/faculty/Dashboard';
import SetAvailability from './pages/faculty/SetAvailability';
import ConsultationDetail from './pages/faculty/ConsultationDetail';
import FacultyProfile from './pages/faculty/Profile';
import FacultyChangePassword from './pages/faculty/ChangePassword'; 

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard'; 
import ManageUsers from './pages/admin/ManageUsers';
import AllConsultations from './pages/admin/AllConsultations';
import ManageConsultationAreas from './pages/admin/ManageConsultationAreas';
import SystemSettings from './pages/admin/SystemSettings';
import AdminChangePassword from './pages/admin/ChangePassword'; 


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> }, 
    ],
  },
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'schedule', element: <StudentSchedule /> },
      { path: 'status', element: <StudentStatus /> },
      { path: 'profile', element: <StudentProfile /> },
      { path: 'change-password', element: <StudentChangePassword /> },
      { path: '*', element: <NotFound /> }, 
    ],
  },

  {
    path: '/faculty',
    element: <FacultyLayout />,
    children: [
      { path: 'dashboard', element: <FacultyDashboard /> },
      { path: 'availability', element: <SetAvailability /> },
      { path: 'consultations/:id', element: <ConsultationDetail /> },
      { path: 'profile', element: <FacultyProfile /> },
      { path: 'change-password', element: <FacultyChangePassword /> }, 
      { path: '*', element: <NotFound /> },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> }, 
      { path: 'users', element: <ManageUsers /> },
      { path: 'consultations', element: <AllConsultations /> },
      { path: 'consultation-areas', element: <ManageConsultationAreas /> },
      { path: 'settings', element: <SystemSettings /> },
      { path: 'change-password', element: <AdminChangePassword /> }, 
      { path: '*', element: <NotFound /> },
    ],
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
