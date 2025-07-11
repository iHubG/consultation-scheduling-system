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
import ChangePassword from './pages/student/ChangePassword';

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
    element: <StudentLayout />, // or some layout with Navbar
    children: [
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'schedule', element: <StudentSchedule /> },
      { path: 'status', element: <StudentStatus /> },
      { path: 'profile', element: <StudentProfile /> },
      { path: 'change-password', element: <ChangePassword /> }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
