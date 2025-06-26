import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const signout = () => {
    localStorage.removeItem('token');
    toast.success('Đăng xuất thành công.');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <header className='w-full border-b border-gray-200/50 bg-white/90 backdrop-blur-md shadow-lg fixed top-0 z-50'>
      {/* Decorative top border */}
      <div className='h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'></div>

      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo/Brand */}
          <Link to='/user/articles' className='group'>
            <div className='flex items-center space-x-3'>
              {/* Logo Icon */}
              <div className='relative'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110'>
                  <svg
                    className='w-6 h-6 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                    />
                  </svg>
                </div>
                <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse'></div>
              </div>

              {/* Brand Text */}
              <div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300'>
                  GROUP 4 Express
                </h1>
                <p className='text-xs text-gray-500 font-medium'>
                  Tin tức & Bài viết
                </p>
              </div>
            </div>
          </Link>

          {/* User Menu */}
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='group flex items-center space-x-3 px-4 py-2.5 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:border-blue-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200'
            >
              {/* User Avatar */}
              <div className='relative'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200'>
                  <svg
                    className='w-4 h-4 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
              </div>

              {/* User Info */}
              <div className='hidden sm:block text-left'>
                <div className='text-sm font-semibold text-gray-900 uppercase'>
                  {user?.name}
                </div>
                <div className='text-xs text-gray-500'>Thành viên</div>
              </div>

              {/* Chevron */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-all duration-200 ${
                  isDropdownOpen
                    ? 'rotate-180 text-blue-500'
                    : 'group-hover:text-gray-600'
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className='absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden'>
                {/* User Profile Header */}
                <div className='px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100'>
                  <div className='flex items-center space-x-3'>
                    <div className='relative'>
                      <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg'>
                        <svg
                          className='w-6 h-6 text-white'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white'></div>
                    </div>
                    <div className='flex-1'>
                      <div className='text-sm font-bold text-gray-900 uppercase'>
                        {user?.name}
                      </div>
                      <div className='text-xs text-gray-600'>{user?.email}</div>
                      <div className='flex items-center space-x-1 mt-1'>
                        <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                        <span className='text-xs text-green-600 font-medium'>
                          Đang hoạt động
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className='py-2'>
                  <Link
                    to='/user/my-articles'
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <button className='group flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:bg-blue-50 transition-all duration-200'>
                      <div className='p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors duration-200 mr-3'>
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
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='font-medium'>Bài báo của tôi</div>
                        <div className='text-xs text-gray-500'>
                          Quản lý bài viết đã đăng
                        </div>
                      </div>
                      <svg
                        className='w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </Link>

                  <Link to='/user/add' onClick={() => setIsDropdownOpen(false)}>
                    <button className='group flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 focus:outline-none focus:bg-green-50 transition-all duration-200'>
                      <div className='p-2 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors duration-200 mr-3'>
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
                            d='M12 4v16m8-8H4'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='font-medium'>Thêm bài viết</div>
                        <div className='text-xs text-gray-500'>
                          Tạo bài viết mới
                        </div>
                      </div>
                      <svg
                        className='w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </Link>

                  <div className='border-t border-gray-100 mt-2 pt-2'>
                    <button
                      onClick={signout}
                      className='group flex items-center w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50 transition-all duration-200'
                    >
                      <div className='p-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors duration-200 mr-3'>
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
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          />
                        </svg>
                      </div>
                      <div className='flex-1 text-left'>
                        <div className='font-medium'>Đăng xuất</div>
                        <div className='text-xs text-red-400'>
                          Thoát khỏi tài khoản
                        </div>
                      </div>
                      <svg
                        className='w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors duration-200'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className='px-6 py-3 bg-gray-50 border-t border-gray-100'>
                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <span>© 2024 GROUP 4 Express</span>
                    <div className='flex items-center space-x-1'>
                      <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                      <span>Hệ thống hoạt động</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backdrop Overlay */}
            {isDropdownOpen && (
              <div
                className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm'
                onClick={() => setIsDropdownOpen(false)}
              ></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
