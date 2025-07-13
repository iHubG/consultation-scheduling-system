import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin!</h1>
        <p className="text-sm text-gray-500">Here’s what’s happening in your system today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-semibold text-lavender-600">324</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Consultations</p>
          <p className="text-2xl font-semibold text-lavender-600">87</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <p className="text-2xl font-semibold text-yellow-500">12</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">System Uptime</p>
          <p className="text-2xl font-semibold text-green-600">99.9%</p>
        </div>
      </div>

      {/* Recent activity or system overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Recent Consultations</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📅 Dr. Smith approved consultation with John Doe</li>
            <li>📅 New consultation request from Jane Roe</li>
            <li>📅 Dr. Patel updated availability</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">System Insights</h2>
          <p className="text-sm text-gray-500">You can add charts or logs here later.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
