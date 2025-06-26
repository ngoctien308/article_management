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
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse'></div>
      <div className='absolute bottom-10 right-10 w-16 h-16 bg-indigo-200 rounded-full opacity-20 animate-pulse animation-delay-1000'></div>
      <div className='absolute top-1/2 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-10 animate-bounce animation-delay-500'></div>

      <div className='w-full max-w-md'>
        {/* Main Card */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
          {/* Header */}
          <div className='px-8 pt-8 pb-6 text-center space-y-4'>
            {/* Icon */}
            <div className='flex justify-center'>
              <div
                className={`p-4 rounded-full ${
                  isAdmin ? 'bg-amber-100' : 'bg-blue-100'
                } shadow-lg`}
              >
                {isAdmin ? (
                  <svg
                    className='w-8 h-8 text-amber-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-8 h-8 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Title */}
            <h2 className='text-3xl font-bold text-gray-800'>
              {isAdmin ? 'Đăng nhập cho Admin' : 'Đăng nhập'}
            </h2>

            {/* Subtitle */}
            <p className='text-gray-600'>
              {isAdmin
                ? 'Truy cập bảng điều khiển quản trị'
                : 'Chào mừng bạn trở lại'}
            </p>
          </div>

          {/* Content */}
          <div className='px-8 pb-8 space-y-6'>
            {/* Admin Notice */}
            {isAdmin && (
              <div className='bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3'>
                <svg
                  className='w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
                <div className='text-amber-800'>
                  <span className='font-semibold'>Lưu ý:</span> Chỉ tài khoản
                  của admin mới có thể đăng nhập.
                </div>
              </div>
            )}

            {/* Form */}
            <form className='space-y-5' onSubmit={handleSignIn}>
              {/* Email Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
                  </div>
                  <input
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    placeholder='Nhập email của bạn'
                    className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Mật khẩu
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </div>
                  <input
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    placeholder='Nhập mật khẩu'
                    className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-lg hover:shadow-xl ${
                  isAdmin
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:ring-amber-500'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500'
                }`}
              >
                <span className='flex items-center justify-center space-x-2'>
                  <span>Đăng nhập</span>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                    />
                  </svg>
                </span>
              </button>

              {/* Sign Up Link */}
              {!isAdmin && (
                <div className='pt-6 border-t border-gray-100'>
                  <div className='text-center'>
                    <p className='text-gray-600'>
                      Chưa có tài khoản?{' '}
                      <NavLink
                        to='/user/signup'
                        className='text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200'
                      >
                        Đăng kí ngay
                      </NavLink>
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className='text-center mt-8'>
          <p className='text-gray-400 text-sm'>
            {isAdmin
              ? 'Bảo mật cao cấp cho quản trị viên'
              : 'Đăng nhập an toàn và bảo mật'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
