import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomNavLink = ({ to, children, onClick, mobile = false }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'block px-4 py-2 rounded whitespace-nowrap', // ✅ consistent layout
          mobile
            ? isActive
              ? 'bg-purple-500 text-white'
              : 'hover:bg-purple-500 text-white/80'
            : isActive
            ? 'text-purple-700 font-semibold bg-purple-100'
            : 'hover:text-purple-300'
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
