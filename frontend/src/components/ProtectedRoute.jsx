import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Header from './user/Header';
import { toast } from 'react-toastify';
import Footer from './user/Footer';
import AdminSidebar from './admin/AdminSidebar';

export default function ProtectedRoute() {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.warning('Phiên đăng nhập hết hạn.');
      navigate(`/${isAdmin ? 'admin' : 'user'}/signin`);
    }
  }, [token]);

  return (
    <>
      {isAdmin && (
        <div className='flex'>
          <AdminSidebar />
          <main className='ml-64 flex-1 p-6 bg-gray-50 min-h-screen'>
            <Outlet />
          </main>
        </div>
      )}

      {!isAdmin && (
        <>
          {user && <Header user={user} />}
          <div className='mt-20'>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
