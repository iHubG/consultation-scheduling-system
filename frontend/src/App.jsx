import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import NotificationIcon from './components/NotificationIcon';

const App = () => {
  return (
    <div>
      <Outlet /> 
      {/* <NotificationIcon /> */}
    </div>
  )
}

export default App