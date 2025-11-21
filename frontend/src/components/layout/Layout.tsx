import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center font-bold text-xl">
                POS Terminal
              </Link>
              <Link to="/pos" className="flex items-center px-3 text-gray-700 hover:text-gray-900">
                POS
              </Link>
              <Link to="/products" className="flex items-center px-3 text-gray-700 hover:text-gray-900">
                Products
              </Link>
              <Link to="/inventory" className="flex items-center px-3 text-gray-700 hover:text-gray-900">
                Inventory
              </Link>
              <Link to="/reports" className="flex items-center px-3 text-gray-700 hover:text-gray-900">
                Reports
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user?.email}</span>
              <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
