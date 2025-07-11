import React, { useState } from 'react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    // TODO: Send data to backend for password change

    setTimeout(() => {
      setSuccess('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Change Password
        </h2>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <label className="block mb-2 font-semibold">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-300 outline-none"
          required
        />

        <label className="block mb-2 font-semibold">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-300 outline-none"
          required
        />

        <label className="block mb-2 font-semibold">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-300 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
