import React from 'react';
import Navbar from '../components/FacultyNavbar';
import { Outlet } from 'react-router-dom';

const FacultyLayout = () => (
  <div>
    <Navbar />
    <main>
      <Outlet /> 
    </main>
  </div>
);

export default FacultyLayout;
