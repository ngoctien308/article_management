import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    totalComments: 0,
    topArticles: [],
    latestArticles: []
  });

  const fetchStats = async () => {
    try {
      const [userRes, articleRes, commentRes] = await Promise.all([
        axios.get('http://localhost:3000/api/users'),
        axios.get('http://localhost:3000/api/articles'),
        axios.get('http://localhost:3000/api/comments')
      ]);

      const { articles } = articleRes.data;

      const topArticles = [...articles]
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);

      const latestArticles = [...articles]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 3);

      setStats({
        totalUsers: userRes.data.users.length,
        totalArticles: articles.length,
        totalComments: commentRes.data.comments.length,
        topArticles,
        latestArticles
      });
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu dashboard:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse'></div>
      <div className='absolute bottom-20 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-15 animate-bounce animation-delay-1000'></div>
      <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-10 animate-pulse animation-delay-500'></div>

      <div className='relative z-10'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-4 mb-2'>
            <div className='p-3 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg'>
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
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </div>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent'>
                Tổng quan quản trị
              </h1>
              <p className='text-gray-600'>
                Theo dõi hoạt động và thống kê hệ thống
              </p>
            </div>
          </div>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full'></div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          {/* Users Card */}
          <div className='group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 transform hover:-translate-y-1'>
            <div className='p-6 relative'>
              <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -translate-y-10 translate-x-10'></div>
              <div className='relative'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300'>
                    <svg
                      className='w-6 h-6 text-blue-600'
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
                  <div className='text-right'>
                    <div className='text-xs text-gray-500 font-medium'>
                      TỔNG SỐ
                    </div>
                    <div className='text-2xl font-bold text-blue-600'>
                      {stats.totalUsers}
                    </div>
                  </div>
                </div>
                <h2 className='text-lg font-semibold text-gray-900 mb-2'>
                  Người dùng
                </h2>
                {/* <div className='flex items-center space-x-2'>
                  <div className='flex items-center space-x-1 text-green-600'>
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
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                    <span className='text-sm font-medium'>+12%</span>
                  </div>
                  <span className='text-sm text-gray-500'>
                    so với tháng trước
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Articles Card */}
          <div className='group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 transform hover:-translate-y-1'>
            <div className='p-6 relative'>
              <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full -translate-y-10 translate-x-10'></div>
              <div className='relative'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 rounded-xl bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300'>
                    <svg
                      className='w-6 h-6 text-green-600'
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
                  <div className='text-right'>
                    <div className='text-xs text-gray-500 font-medium'>
                      TỔNG SỐ
                    </div>
                    <div className='text-2xl font-bold text-green-600'>
                      {stats.totalArticles}
                    </div>
                  </div>
                </div>
                <h2 className='text-lg font-semibold text-gray-900 mb-2'>
                  Bài viết
                </h2>
                {/* <div className='flex items-center space-x-2'>
                  <div className='flex items-center space-x-1 text-green-600'>
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
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                    <span className='text-sm font-medium'>+8%</span>
                  </div>
                  <span className='text-sm text-gray-500'>
                    so với tháng trước
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Comments Card */}
          <div className='group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 transform hover:-translate-y-1'>
            <div className='p-6 relative'>
              <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -translate-y-10 translate-x-10'></div>
              <div className='relative'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300'>
                    <svg
                      className='w-6 h-6 text-purple-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                      />
                    </svg>
                  </div>
                  <div className='text-right'>
                    <div className='text-xs text-gray-500 font-medium'>
                      TỔNG SỐ
                    </div>
                    <div className='text-2xl font-bold text-purple-600'>
                      {stats.totalComments}
                    </div>
                  </div>
                </div>
                <h2 className='text-lg font-semibold text-gray-900 mb-2'>
                  Bình luận
                </h2>
                {/* <div className='flex items-center space-x-2'>
                  <div className='flex items-center space-x-1 text-green-600'>
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
                        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                      />
                    </svg>
                    <span className='text-sm font-medium'>+15%</span>
                  </div>
                  <span className='text-sm text-gray-500'>
                    so với tháng trước
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Top Articles */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'>
            <div className='p-6 border-b border-gray-100'>
              <div className='flex items-center space-x-3'>
                <div className='p-2 rounded-lg bg-gradient-to-br from-orange-100 to-red-100'>
                  <svg
                    className='w-5 h-5 text-orange-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'
                    />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-gray-900'>
                  Bài viết nổi bật
                </h2>
              </div>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                {stats.topArticles.map((a, index) => (
                  <div
                    key={a.id}
                    className='group bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 p-4 rounded-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 transform hover:scale-105'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex-1 mr-4'>
                        <div className='flex items-center space-x-2 mb-2'>
                          <div className='flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold'>
                            {index + 1}
                          </div>
                          <div className='px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full'>
                            HOT
                          </div>
                        </div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2'>
                          {a.title}
                        </h3>
                        <div className='flex items-center space-x-4 mt-2'>
                          <div className='flex items-center space-x-1 text-gray-600'>
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
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              />
                            </svg>
                            <span className='text-sm font-medium'>
                              {a.views || 0} lượt xem
                            </span>
                          </div>
                          <div className='flex items-center space-x-1 text-gray-500'>
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
                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                              />
                            </svg>
                            <span className='text-sm'>{a.authorName}</span>
                          </div>
                        </div>
                      </div>
                      <div className='relative'>
                        <img
                          src={a.image || '/placeholder.svg?height=64&width=64'}
                          alt={a.title}
                          className='w-16 h-16 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Articles */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'>
            <div className='p-6 border-b border-gray-100'>
              <div className='flex items-center space-x-3'>
                <div className='p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100'>
                  <svg
                    className='w-5 h-5 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-gray-900'>
                  Bài viết mới nhất
                </h2>
              </div>
            </div>
            <div className='p-6'>
              <div className='space-y-4'>
                {stats.latestArticles.map((a) => (
                  <div
                    key={a.id}
                    className='group flex items-center gap-4 bg-gradient-to-r from-gray-50 to-green-50 hover:from-green-50 hover:to-emerald-50 p-4 rounded-xl border border-gray-200/50 hover:border-green-300/50 transition-all duration-300 transform hover:scale-105'
                  >
                    <div className='relative'>
                      <img
                        src={a.image || '/placeholder.svg?height=56&width=56'}
                        alt={a.title}
                        className='w-14 h-14 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300'
                      />
                      <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse'></div>
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2 mb-1'>
                        <div className='px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
                          MỚI
                        </div>
                        <div className='text-xs text-gray-500'>
                          {new Date(a.publishDate).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      <p className='font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-200 line-clamp-2'>
                        {a.title}
                      </p>
                      <div className='flex items-center space-x-2 mt-1'>
                        <div className='flex items-center space-x-1 text-gray-500'>
                          <svg
                            className='w-3 h-3'
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
                          <span className='text-xs'>{a.authorName}</span>
                        </div>
                        <span className='text-gray-300'>•</span>
                        <div className='flex items-center space-x-1 text-gray-500'>
                          <svg
                            className='w-3 h-3'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                          </svg>
                          <span className='text-xs'>{a.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
