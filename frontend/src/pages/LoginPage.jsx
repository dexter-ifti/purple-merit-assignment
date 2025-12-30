import React, { useState } from 'react';
import { User } from 'lucide-react';
import Input from '../components/Input';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthProvider';

const LoginPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      setToast({ message: 'Login successful', type: 'success' });
    } catch (error) {
      setToast({ message: error.message || 'Login failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            error={errors.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            error={errors.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
              transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </div>

        {/* Demo credentials (clearly secondary) */}
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600">
          <p className="mb-1 font-medium text-gray-700">
            Demo credentials
          </p>
          <p>Admin — admin@example.com / Admin@123</p>
          <p>User — user@example.com / User@123</p>
        </div>
      </div>

      {toast && (
        <div className="fixed right-4 top-4 z-50">
          <Toast {...toast} onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
