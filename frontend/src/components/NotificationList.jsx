import React from 'react'
import { CheckCircle, Dot } from 'lucide-react'

const NotificationList = ({ notifications, onMarkAsRead }) => {
  if (!notifications || notifications.length === 0) {
    return <p className="text-gray-600">No new notifications.</p>
  }

  return (
    <ul className="space-y-3">
      {notifications.map((n) => (
        <li
          key={n.id}
          className={`flex items-start justify-between p-4 rounded border ${
            n.read ? 'bg-gray-50 border-gray-200' : 'bg-purple-50 border-purple-200'
          }`}
        >
          <div className="flex items-start gap-2">
            {!n.read && <Dot className="text-purple-500" />}
            <div>
              <p className="text-sm text-gray-800">{n.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(n.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {!n.read && onMarkAsRead && (
            <button
              onClick={() => onMarkAsRead(n.id)}
              className="text-xs text-purple-600 hover:underline cursor-pointer"
            >
              <CheckCircle className="inline w-4 h-4 mr-1" />
              Mark as read
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

export default NotificationList
