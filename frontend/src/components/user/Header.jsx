import { useState } from 'react';

const Header = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const signout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header className='w-full border-b bg-white shadow-sm'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo/Tên website bên trái */}
          <div className='flex items-center'>
            <h1 className='text-2xl font-bold text-blue-600'>
              GROUP 4 Express
            </h1>
          </div>

          {/* Combobox người dùng bên phải */}
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              {/* User Icon */}
              <svg
                className='h-4 w-4'
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
              <span className='hidden sm:inline'>{user?.name}</span>
              {/* Chevron Down Icon */}
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
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
              <div className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                {/* User Info */}
                <div className='px-4 py-3 border-b border-gray-100'>
                  <div className='text-sm font-medium text-gray-900'>
                    {user?.name}
                  </div>
                  <div className='text-xs text-gray-500'>{user?.email}</div>
                </div>

                {/* Menu Items */}
                <div className='py-1'>
                  <button className='flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100'>
                    {/* FileText Icon */}
                    <svg
                      className='mr-3 h-4 w-4'
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
                    Bài báo của tôi
                  </button>
                </div>

                <div className='border-t border-gray-100' onClick={signout}>
                  <button className='flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:bg-red-50'>
                    {/* LogOut Icon */}
                    <svg
                      className='mr-3 h-4 w-4'
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
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}

            {/* Overlay để đóng dropdown khi click bên ngoài */}
            {isDropdownOpen && (
              <div
                className='fixed inset-0 z-40'
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
