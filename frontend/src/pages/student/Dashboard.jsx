import React, { useEffect, useState } from 'react'
import axios from '../../lib/axios'
import NotificationList from '../../components/NotificationList'
import Spinner from '../../components/InlineSpinner' // ✅ import here
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true) // ✅

  useEffect(() => {
    axios
      .get('/notifications')
      .then((res) => setNotifications(res.data))
      .catch(() => {
        setNotifications([
          {
            id: 1,
            message: 'Your consultation request was approved.',
            read: false,
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            message: 'Reminder: Upcoming consultation tomorrow.',
            read: true,
            created_at: new Date(Date.now() - 3600 * 1000).toISOString(),
          },
        ])
      })
      .finally(() => setLoading(false)) // ✅
  }, [])

  const handleMarkAsRead = async (id) => {
    await axios.post(`/notifications/mark-as-read/${id}`)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <div className="min-h-screen bg-purple-50 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Welcome, Student!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200">
          <h2 className="text-xl font-semibold mb-2">Consultation Requests</h2>
          <p className="text-4xl font-bold text-purple-600">3</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200">
          <h2 className="text-xl font-semibold mb-2">Upcoming Consultations</h2>
          <p className="text-4xl font-bold text-purple-600">1</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <Link
            to="/student/schedule"
            className="mb-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 text-center"
          >
            Schedule Consultation
          </Link>
          <Link
            to="/student/status"
            className="w-full border border-purple-600 text-purple-600 py-2 rounded hover:bg-purple-100 text-center"
          >
            Track Status
          </Link>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-purple-200">
        <h2 className="text-xl font-semibold mb-3">Notifications</h2>
        {loading ? (
          <Spinner />
        ) : (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
