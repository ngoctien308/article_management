const Footer = () => {
  return (
    <footer className='relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-4 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-5 animate-pulse'></div>
        <div className='absolute top-8 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-5 animate-pulse animation-delay-1000'></div>
        <div className='absolute bottom-4 left-1/4 w-12 h-12 bg-indigo-500 rounded-full opacity-5 animate-pulse animation-delay-500'></div>
        <div className='absolute bottom-8 right-1/3 w-14 h-14 bg-cyan-500 rounded-full opacity-5 animate-pulse animation-delay-700'></div>
      </div>

      {/* Top border gradient */}
      <div className='h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'></div>

      <div className='relative container mx-auto px-4 py-16'>
        {/* Main Content */}
        <div className='text-center space-y-8'>
          {/* Logo/Brand Section */}
          <div className='flex justify-center mb-8'>
            <div className='group'>
              <div className='flex items-center space-x-4'>
                {/* Logo Icon */}
                <div className='relative'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110'>
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
                        d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                      />
                    </svg>
                  </div>
                  <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse'></div>
                </div>

                {/* Brand Text */}
                <div className='text-left'>
                  <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'>
                    Tiến Express
                  </h2>
                  <p className='text-sm text-gray-400 font-medium'>
                    Tin tức & Bài viết
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
            {/* Company */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-white mb-4 relative'>
                Công ty
                <div className='absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-transparent'></div>
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-white mb-4 relative'>
                Dịch vụ
                <div className='absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent'></div>
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Tin tức
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Bài viết
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-purple-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Đăng ký
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-white mb-4 relative'>
                Hỗ trợ
                <div className='absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent'></div>
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Điều khoản
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm hover:underline'
                  >
                    Bảo mật
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-white mb-4 relative'>
                Kết nối
                <div className='absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent'></div>
              </h3>
              <div className='flex space-x-4 justify-center md:justify-start'>
                <a
                  href='#'
                  className='group p-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition-all duration-200 transform hover:scale-110'
                >
                  <svg
                    className='w-5 h-5 text-gray-400 group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='group p-2 rounded-lg bg-gray-800 hover:bg-blue-700 transition-all duration-200 transform hover:scale-110'
                >
                  <svg
                    className='w-5 h-5 text-gray-400 group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='group p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-200 transform hover:scale-110'
                >
                  <svg
                    className='w-5 h-5 text-gray-400 group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='group p-2 rounded-lg bg-gray-800 hover:bg-red-600 transition-all duration-200 transform hover:scale-110'
                >
                  <svg
                    className='w-5 h-5 text-gray-400 group-hover:text-white'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-700/50 pt-8'>
            {/* Copyright and Additional Info */}
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              <div className='text-center md:text-left'>
                <p className='text-gray-400 text-sm'>
                  &copy; 2024 Tiến Express. Tất cả quyền được bảo lưu.
                </p>
                <p className='text-gray-500 text-xs mt-1'>
                  Được phát triển với ❤️ tại Việt Nam
                </p>
              </div>

              {/* Additional Links */}
              <div className='flex items-center space-x-6 text-sm'>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:underline'
                >
                  Chính sách bảo mật
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:underline'
                >
                  Điều khoản sử dụng
                </a>
                <a
                  href='#'
                  className='text-gray-400 hover:text-blue-400 transition-colors duration-200 hover:underline'
                >
                  Sitemap
                </a>
              </div>
            </div>

            {/* Status Indicator */}
            <div className='flex justify-center items-center mt-6 pt-6 border-t border-gray-700/30'>
              <div className='flex items-center space-x-2 text-xs text-gray-500'>
                <div className='flex items-center space-x-1'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                  <span>Hệ thống hoạt động</span>
                </div>
                <span>•</span>
                <span>Phiên bản 2.1.0</span>
                <span>•</span>
                <span>Cập nhật: {new Date().toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div className='h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500'></div>
    </footer>
  );
};

export default Footer;
