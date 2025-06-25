import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Header from './user/Header';
import { toast } from 'react-toastify';

export default function ProtectedRoute() {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.warning('Phiên đăng nhập hết hạn.');
      navigate('/user/signin');
    }
  }, [token]);

  return (
    <>
      {user && <Header user={user} />}
      <div className='mt-20'>
        <Outlet />
      </div>
    </>
  );
}
