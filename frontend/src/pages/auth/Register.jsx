import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    studentId: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Simple regex email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate all fields, return true if valid, false otherwise
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';

    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email is invalid.';

    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters.';

    if (formData.role === 'student' && !formData.studentId.trim())
      newErrors.studentId = 'Student ID is required for students.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change for this field
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess('');
    setError('');

    if (!validate()) return;

    setLoading(true);

    // Simulate API call with delay
    setTimeout(() => {
      // Fake validation example
      if (formData.email === 'taken@example.com') {
        setError('Email is already in use.');
        setLoading(false);
      } else {
        setSuccess(
          formData.role === 'faculty'
            ? 'Registration successful! Await admin approval.'
            : 'Registration successful! You can now log in.'
        );
        setLoading(false);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Register Account
        </h2>

        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center font-semibold">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded focus:ring-2 outline-none ${
              errors.name
                ? 'border-red-500 focus:ring-red-300'
                : 'border-gray-300 focus:ring-purple-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded focus:ring-2 outline-none ${
              errors.email
                ? 'border-red-500 focus:ring-red-300'
                : 'border-gray-300 focus:ring-purple-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
<div className="mb-4">
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      className={`w-full px-4 py-2 pr-10 border rounded focus:ring-2 outline-none ${
        errors.password
          ? 'border-red-500 focus:ring-red-300'
          : 'border-gray-300 focus:ring-purple-300'
      }`}
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-700"
      tabIndex={-1}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
  {errors.password && (
    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
  )}
</div>


        {/* Role */}
        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-300 outline-none"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>

        {/* Student ID */}
        {formData.role === 'student' && (
          <div className="mb-4">
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded focus:ring-2 outline-none ${
                errors.studentId
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-gray-300 focus:ring-purple-300'
              }`}
            />
            {errors.studentId && (
              <p className="text-red-600 text-sm mt-1">{errors.studentId}</p>
            )}
          </div>
        )}

        {/* Faculty approval note */}
        {formData.role === 'faculty' && (
          <p className="text-sm text-yellow-700 bg-yellow-100 p-2 rounded mb-4 text-center">
            Faculty accounts require admin approval before activation.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
          } transition`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
