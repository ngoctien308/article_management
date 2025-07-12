import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${isActive
      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700'
    }`;

  return (
    <aside className='z-10 h-screen w-72 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 shadow-2xl border-r border-blue-100/50 p-6 fixed left-0 top-0 backdrop-blur-sm overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full -translate-y-16 translate-x-16'></div>
      <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12'></div>

      <div className='relative z-10'>
        {/* Header Section */}
        <div className='mb-10 pb-6 border-b border-blue-100/50'>
          <div className='flex items-center space-x-3 mb-6'>
            {/* Admin Icon */}
            <div className='relative'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
                <svg
                  className='w-7 h-7 text-white'
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
              </div>
              <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse'></div>
            </div>

            {/* Title */}
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                Admin Panel
              </h1>
              <p className='text-xs text-gray-500 font-medium'>
                Quản trị hệ thống
              </p>
            </div>
          </div>

          {/* Admin Info Card */}
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-white'
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
              <div className='flex-1'>
                <div className='text-sm font-semibold text-gray-900'>
                  Administrator
                </div>
                <div className='text-xs text-gray-600'>
                  Quyền quản trị cao nhất
                </div>
              </div>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className='space-y-2 mb-8'>
          <div className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2'>
            Điều hướng chính
          </div>

          <NavLink to='/admin/dashboard' className={navLinkClass}>
            <div className='p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-all duration-200'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </div>
            <div>
              <div className='font-medium'>Dashboard</div>
              <div className='text-xs opacity-75'>Tổng quan hệ thống</div>
            </div>
          </NavLink>

          <NavLink to='/admin/users' className={navLinkClass}>
            <div className='p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-all duration-200'>
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                />
              </svg>
            </div>
            <div>
              <div className='font-medium'>Người dùng</div>
              <div className='text-xs opacity-75'>Quản lý tài khoản</div>
            </div>
          </NavLink>

          <NavLink to='/admin/articles' className={navLinkClass}>
            <div className='p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-all duration-200'>
              <svg
                className='w-5 h-5'
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
            <div>
              <div className='font-medium'>Bài viết</div>
              <div className='text-xs opacity-75'>Quản lý nội dung</div>
            </div>
          </NavLink>

          <NavLink to='/admin/categories' className={navLinkClass}>
            <div className='p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-all duration-200'>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM9 7v10m6-10v10"
                />
              </svg>
            </div>
            <div>
              <div className='font-medium'>Thể loại</div>
              <div className='text-xs opacity-75'>Quản lý thể loại của bài báo</div>
            </div>
          </NavLink>
        </nav>

        {/* System Status */}
        <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50 mb-6'>
          <div className='flex items-center space-x-3'>
            <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
            <div className='flex-1'>
              <div className='text-sm font-semibold text-green-900'>
                Hệ thống hoạt động
              </div>
              <div className='text-xs text-green-700'>
                Tất cả dịch vụ đang online
              </div>
            </div>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* Logout Section */}
        <div className='pt-6 border-t border-blue-100/50'>
          <button
            className='group w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border border-red-200/50 hover:border-red-300/50 text-red-700 hover:text-red-800 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md'
            onClick={handleLogout}
          >
            <div className='p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-all duration-200'>
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
              <div className='text-xs opacity-75'>Thoát khỏi admin panel</div>
            </div>
            <svg
              className='w-4 h-4 transition-transform duration-200 group-hover:translate-x-1'
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

        {/* Footer */}
        <div className='mt-6 pt-4 border-t border-blue-100/30'>
          <div className='text-center'>
            <div className='text-xs text-gray-500'>© 2024 Admin Panel</div>
            <div className='text-xs text-gray-400 mt-1'>v2.1.0</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
