import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPasword: ''
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { email, name, password, confirmPasword } = formData;

    if (password !== confirmPasword) {
      return toast.error('Mật khẩu và mật khẩu xác nhận phải giống nhau.');
    }

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        name,
        email,
        password
      });

      toast.success(res?.data.message);
      setFormData({ name: '', email: '', password: '', confirmPasword: '' });
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse'></div>
      <div className='absolute bottom-10 right-10 w-16 h-16 bg-teal-200 rounded-full opacity-20 animate-pulse animation-delay-1000'></div>
      <div className='absolute top-1/3 right-1/4 w-12 h-12 bg-green-200 rounded-full opacity-10 animate-bounce animation-delay-500'></div>
      <div className='absolute bottom-1/3 left-1/4 w-8 h-8 bg-cyan-200 rounded-full opacity-15 animate-pulse animation-delay-700'></div>

      <div className='w-full max-w-md'>
        {/* Main Card */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
          {/* Header */}
          <div className='px-8 pt-8 pb-6 text-center space-y-4'>
            {/* Icon */}
            <div className='flex justify-center'>
              <div className='p-4 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 shadow-lg'>
                <svg
                  className='w-8 h-8 text-emerald-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className='text-3xl font-bold text-gray-800'>Đăng ký</h2>

            {/* Subtitle */}
            <p className='text-gray-600'>Tạo tài khoản mới để bắt đầu</p>
          </div>

          {/* Content */}
          <div className='px-8 pb-8 space-y-6'>
            {/* Welcome Message */}
            <div className='bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3'>
              <svg
                className='w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <div className='text-emerald-800 text-sm'>
                <span className='font-semibold'>Chào mừng!</span> Vui lòng điền
                thông tin để tạo tài khoản mới.
              </div>
            </div>

            {/* Form */}
            <form className='space-y-5' onSubmit={handleSignUp}>
              {/* Name Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Tên người dùng
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
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <input
                    id='name'
                    required
                    value={formData.name}
                    name='name'
                    onChange={handleInputChange}
                    placeholder='Nhập tên người dùng'
                    className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
              </div>

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
                    value={formData.email}
                    name='email'
                    onChange={handleInputChange}
                    type='email'
                    placeholder='Nhập địa chỉ email'
                    className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
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
                    value={formData.password}
                    name='password'
                    onChange={handleInputChange}
                    type='password'
                    placeholder='Nhập mật khẩu'
                    className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-700'
                >
                  Xác nhận mật khẩu
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
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <input
                    id='confirmPassword'
                    required
                    value={formData.confirmPasword}
                    name='confirmPasword'
                    onChange={handleInputChange}
                    type='password'
                    placeholder='Nhập lại mật khẩu'
                    className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
              >
                <span className='flex items-center justify-center space-x-2'>
                  <span>Đăng ký</span>
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
                      d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                    />
                  </svg>
                </span>
              </button>

              {/* Sign In Link */}
              <div className='pt-6 border-t border-gray-100'>
                <div className='text-center'>
                  <p className='text-gray-600'>
                    Đã có tài khoản?{' '}
                    <Link
                      className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors duration-200'
                      to='/user/signin'
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className='text-center mt-8'>
          <p className='text-gray-400 text-sm'>
            Tham gia cộng đồng của chúng tôi ngay hôm nay
          </p>
        </div>

        {/* Security badges */}
        <div className='flex justify-center items-center space-x-6 mt-6'>
          <div className='flex items-center space-x-2 text-gray-400'>
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
                d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              />
            </svg>
            <span className='text-xs'>Bảo mật</span>
          </div>
          <div className='flex items-center space-x-2 text-gray-400'>
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
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </svg>
            <span className='text-xs'>Nhanh chóng</span>
          </div>
          <div className='flex items-center space-x-2 text-gray-400'>
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
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
            <span className='text-xs'>Tin cậy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
