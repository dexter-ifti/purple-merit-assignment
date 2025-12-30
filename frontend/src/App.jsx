import React, { useState } from 'react';
import { Users, LogOut, Menu } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthProvider';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';

const AppContent = () => {
  const { user, logout } = useAuth();
  const [page, setPage] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // derive active page from auth state when logged in; avoid calling setState inside effects
  const activePage = user ? (user.role === 'admin' ? 'admin' : 'profile') : page;

  if (!user) {
    return page === 'login' ? <LoginPage onNavigate={setPage} /> : <SignupPage onNavigate={setPage} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">UserHub</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {user.role === 'admin' && (
                <button onClick={() => setPage('admin')} className={`font-medium ${page === 'admin' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                  Users
                </button>
              )}
              <button onClick={() => setPage('profile')} className={`font-medium ${page === 'profile' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Profile
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                <button onClick={logout} className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-2">
              {user.role === 'admin' && (
                <button onClick={() => { setPage('admin'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">Users</button>
              )}
              <button onClick={() => { setPage('profile'); setMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">Profile</button>
              <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50">Logout</button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto">
  {activePage === 'admin' && user.role === 'admin' && <AdminDashboard />}
  {activePage === 'profile' && <UserProfile />}
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
