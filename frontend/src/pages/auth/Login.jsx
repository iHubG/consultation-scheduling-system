import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address.';
    if (!formData.password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mockLogin = (email) => {
    // Simulate fetching role from backend based on email
    if (email.includes('admin')) return 'admin';
    if (email.includes('faculty')) return 'faculty';
    return 'student';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const role = mockLogin(formData.email); // Simulate backend response

      if (formData.password === 'password') {
        setSuccess('Login successful!');
        setLoading(false);

        // Navigate to dashboard based on role
        setTimeout(() => {
          if (role === 'admin') navigate('/admin');
          else if (role === 'faculty') navigate('/faculty');
          else navigate('/student/dashboard');
        }, 1500);
      } else {
        setError('Invalid email or password.');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-purple-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Login to Your Account
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

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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

        {/* Password */}
        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          } transition`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
