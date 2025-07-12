import React from 'react';
import Navbar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div>
    <Navbar />
    <main>
      <Outlet /> 
    </main>
  </div>
);

export default AdminLayout;
