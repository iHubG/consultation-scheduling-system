// ExampleComponent.jsx
import React, { useState } from 'react';
import useFaviconBadge from '../lib/useFaviconBadge';

const NotificationIcon = () => {
  const [notifCount, setNotifCount] = useState(0);

  useFaviconBadge(notifCount);

  return (
    <div className="p-4 space-x-3">
      <button
        onClick={() => setNotifCount((prev) => prev + 1)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Notification
      </button>

      <button
        onClick={() => setNotifCount(0)}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default NotificationIcon;
