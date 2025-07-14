import React, { useState } from "react";
import Swal from "sweetalert2";

const defaultSettings = {
  systemName: "Consultation Scheduler",
  contactEmail: "support@example.com",
  defaultDuration: 30, // in minutes
  allowStudentBooking: true,
};

const SystemSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    const res = await Swal.fire({
      title: "Save Changes?",
      text: "This will update your system settings.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Save",
    });

    if (res.isConfirmed) {
      // Simulate saving (API logic can go here)
      Swal.fire("Saved!", "Settings have been updated.", "success");
      // Optional: persist to localStorage or backend here
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
        <p className="text-sm text-gray-500">
          Configure global settings for your scheduling system.
        </p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        {/* System Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">System Name</label>
          <input
            type="text"
            name="systemName"
            value={settings.systemName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Default Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Default Consultation Duration (minutes)
          </label>
          <input
            type="number"
            name="defaultDuration"
            value={settings.defaultDuration}
            onChange={handleChange}
            min={10}
            step={5}
            className="mt-1 block w-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Allow Booking */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="allowStudentBooking"
            checked={settings.allowStudentBooking}
            onChange={handleChange}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="allowStudentBooking" className="ml-2 text-sm text-gray-700">
            Allow students to book consultations
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
