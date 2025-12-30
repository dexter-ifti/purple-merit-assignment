import React, { useState } from 'react';
import { User } from 'lucide-react';
import Input from '../components/Input';
import Toast from '../components/Toast';
import { api } from '../api';

const SignupPage = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password =
                'Password must include uppercase, lowercase & number';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await api.signup(formData);
            setToast({ message: 'Account created successfully', type: 'success' });
            setTimeout(() => onNavigate('login'), 1200);
        } catch (err) {
            setToast({ message: err.message || 'Signup failed', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">

                {/* Header */}
                <div className="text-center mb-7">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                        <User className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create your account
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        It takes less than a minute
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.fullName}
                        error={errors.fullName}
                        onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                        }
                    />

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

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        error={errors.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value
                            })
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
              hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:cursor-not-allowed disabled:opacity-60 transition"
                    >
                        {loading ? 'Creating account…' : 'Sign Up'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => onNavigate('login')}
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sign in
                    </button>
                </div>
            </div>

            {toast && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast {...toast} onClose={() => setToast(null)} />
                </div>
            )}
        </div>
    );
};

export default SignupPage;
