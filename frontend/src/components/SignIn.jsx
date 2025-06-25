import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const SignIn = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      if (!isAdmin) {
        navigate('/user/articles');
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password
      });

      if (
        (isAdmin && res.data.role == 'admin') ||
        (!isAdmin && res.data.role == 'user')
      ) {
        toast.success('Đăng nhập thành công.');
        localStorage.setItem('token', res.data.token);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setEmail('');
        setPassword('');
        toast.error('Sai tài khoản hoặc mật khẩu');
      }
    } catch (error) {
      setEmail('');
      setPassword('');
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          {isAdmin ? 'Đăng nhập cho Admin' : 'Đăng nhập'}
        </h2>
        {isAdmin && (
          <p className='bg-amber-100 px-4 py-2 rounded-lg mb-6'>
            <span className='font-bold'>Lưu ý:</span> Chỉ tài khoản của admin
            mới có thể đăng nhập.
          </p>
        )}

        <form className='space-y-4' onSubmit={handleSignIn}>
          <label className='text-gray-600'>Email</label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <label className='text-gray-600'>Mật khẩu</label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Mật khẩu'
            className='border-gray-300 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button
            type='submit'
            className={`w-full py-2 rounded-lg cursor-pointer text-white bg-blue-600 hover:bg-blue-700 transition duration-300`}
          >
            Đăng nhập
          </button>
          {!isAdmin && (
            <p>
              Chưa có tài khoản?{' '}
              <NavLink
                to='/user/signup'
                className='text-blue-500 hover:underline'
              >
                Đăng kí
              </NavLink>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
