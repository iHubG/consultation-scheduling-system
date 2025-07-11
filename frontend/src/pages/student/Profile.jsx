import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    studentId: '20251234',
    name: 'John Doe',
    email: 'john@example.com',
    course: 'BSIT',
    year: '1',
    section: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const courseSections = {
    BSIT: ['WMAD', 'BPO', 'BA', 'NS'],
    BSCS: ['BA', 'DM'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'course' ? { section: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const { name, email } = formData;

    if (!name || !email) {
      setError('Name and Email are required.');
      return;
    }

    setTimeout(() => {
      setSuccess('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex justify-center items-start p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Edit Profile
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              className="w-full mb-4 px-4 py-2 border rounded bg-gray-100 outline-none"
              disabled
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded focus:ring-2 focus:ring-purple-300 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded focus:ring-purple-300 outline-none"
            >
              <option value="BSIT">BSIT</option>
              <option value="BSCS">BSCS</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Year Level</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded focus:ring-purple-300 outline-none"
            >
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded focus:ring-purple-300 outline-none"
            >
              <option value="">-- Select Section --</option>
              {courseSections[formData.course]?.map((section) => (
                <option key={section} value={section}>
                  {formData.course} - {section}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
