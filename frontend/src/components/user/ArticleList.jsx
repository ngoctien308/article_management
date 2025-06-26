import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Article from './Article';
import Footer from './Footer';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get('http://localhost:3000/api/articles');
      setArticles(res.data.articles);
    };
    fetchArticles();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-15 animate-bounce animation-delay-1000'></div>
      <div className='absolute bottom-32 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-10 animate-pulse animation-delay-500'></div>
      <div className='absolute bottom-20 right-1/3 w-20 h-20 bg-cyan-200 rounded-full opacity-10 animate-bounce animation-delay-700'></div>

      {/* Hero Section */}
      <section className='relative bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm'>
        <div className='container mx-auto px-4 py-16'>
          <div className='text-center space-y-8'>
            {/* Icon */}
            <div className='flex justify-center'>
              <div className='p-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg'>
                <svg
                  className='w-12 h-12 text-blue-600'
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
            </div>

            {/* Title */}
            <div className='space-y-4'>
              <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight'>
                Tin tức mới nhất
              </h1>
              <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full'></div>
            </div>

            {/* Subtitle */}
            <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Cập nhật những thông tin nóng hổi và hữu ích từ nhiều lĩnh vực
              khác nhau
            </p>

            {/* Stats */}
            <div className='flex justify-center items-center space-x-8 text-gray-500'>
              <div className='flex items-center space-x-2'>
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
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-sm font-medium'>Cập nhật 24/7</span>
              </div>
              <div className='flex items-center space-x-2'>
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
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-sm font-medium'>Tin cậy</span>
              </div>
              <div className='flex items-center space-x-2'>
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
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
                <span className='text-sm font-medium'>Nhanh chóng</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className='pt-4'>
              <Link to='/user/add'>
                <button className='group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 overflow-hidden'>
                  <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                  <span className='relative flex items-center space-x-2'>
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
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                    <span>Thêm bài báo</span>
                  </span>
                  <div className='absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-indigo-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-200'></div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className='absolute bottom-0 left-0 right-0'>
          <svg
            className='w-full h-6 text-slate-50'
            fill='currentColor'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
          >
            <path
              d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z'
              opacity='.25'
            ></path>
            <path
              d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z'
              opacity='.5'
            ></path>
            <path d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z'></path>
          </svg>
        </div>
      </section>

      {/* Articles Section */}
      <main className='relative container mx-auto px-4 py-16'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-200/50'>
            <svg
              className='w-5 h-5 text-blue-600'
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
            <span className='text-gray-700 font-medium'>
              Danh sách bài viết
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {articles.map((article) => (
              <div
                key={article.id}
                className='group transform transition-all duration-300 hover:-translate-y-2 hover:scale-105'
              >
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 overflow-hidden transition-all duration-300'>
                  <Article article={article} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {articles.length === 0 && (
          <div className='text-center py-16'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
              <svg
                className='w-8 h-8 text-gray-400'
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
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              Chưa có bài viết nào
            </h3>
            <p className='text-gray-600 mb-6'>
              Hãy là người đầu tiên chia sẻ bài viết của bạn!
            </p>
            <Link to='/user/add'>
              <button className='inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200'>
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
                <span>Thêm bài viết đầu tiên</span>
              </button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ArticleList;
