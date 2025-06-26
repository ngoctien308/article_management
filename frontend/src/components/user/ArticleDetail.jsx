import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import CommentList from './CommentList';

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { user, token } = useContext(AuthContext);

  const fetchComments = async () => {
    const res = await axios.get(
      'http://localhost:3000/api/comments?articleId=' + id
    );
    setComments(res.data.comments);
  };

  const fetchArticle = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/articles/' + id);
      setArticle(res.data.article[0]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, []);

  // Hàm lấy màu cho thể loại
  const getCategoryColor = (category) => {
    const colors = {
      'Công nghệ':
        'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300',
      'Kinh doanh':
        'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300',
      'Du lịch':
        'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300',
      'Sức khỏe':
        'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300',
      'Tài chính':
        'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
      'Giáo dục':
        'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300'
    };
    return (
      colors[category] ||
      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300'
    );
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
        <main className='container mx-auto px-4 py-8'>
          <div className='max-w-4xl mx-auto'>
            {/* Loading skeleton */}
            <div className='animate-pulse'>
              <div className='h-4 bg-gray-200 rounded w-1/3 mb-6'></div>
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8'>
                <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
                <div className='h-8 bg-gray-200 rounded w-3/4 mb-4'></div>
                <div className='h-4 bg-gray-200 rounded w-1/2 mb-6'></div>
                <div className='h-64 bg-gray-200 rounded-xl mb-6'></div>
                <div className='space-y-3'>
                  <div className='h-4 bg-gray-200 rounded'></div>
                  <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                  <div className='h-4 bg-gray-200 rounded w-4/6'></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-15 animate-bounce animation-delay-1000'></div>
      <div className='absolute bottom-32 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-10 animate-pulse animation-delay-500'></div>

      <main className='relative container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-8'>
            <div className='flex items-center space-x-2 text-sm bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 shadow-sm w-fit'>
              <Link
                to='/user/articles'
                className='text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1'
              >
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
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  />
                </svg>
                <span>Trang chủ</span>
              </Link>
              <svg
                className='w-4 h-4 text-gray-400'
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
              <span className='text-gray-900 font-medium truncate max-w-xs'>
                {article?.title}
              </span>
            </div>
          </nav>

          {/* Article Content */}
          <article className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mb-8 border border-white/20'>
            {/* Header */}
            <div className='relative p-8 pb-6'>
              {/* Background pattern */}
              <div className='absolute top-0 right-0 w-32 h-32 opacity-5'>
                <svg
                  className='w-full h-full'
                  fill='currentColor'
                  viewBox='0 0 100 100'
                >
                  <circle cx='50' cy='50' r='40' />
                </svg>
              </div>

              <div className='relative'>
                <div className='flex items-center justify-between mb-6'>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm shadow-lg ${getCategoryColor(
                      article?.categoryName
                    )}`}
                  >
                    {article?.categoryName}
                  </span>
                  <div className='flex items-center space-x-6 text-sm text-gray-500'>
                    <div className='flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1'>
                      <svg
                        className='w-4 h-4'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                        <path
                          fillRule='evenodd'
                          d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='font-medium'>
                        {article.views || 0} lượt xem
                      </span>
                    </div>
                  </div>
                </div>

                <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight mb-6'>
                  {article?.title}
                </h1>

                <div className='flex items-center justify-between mb-8'>
                  <div className='flex items-center space-x-4'>
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
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 bg-${
                          article.userActive ? 'green' : 'red'
                        }-400 rounded-full border-2 border-white`}
                      ></div>
                    </div>
                    <div>
                      <div className='font-semibold text-gray-900 text-lg'>
                        {article?.authorName}{' '}
                        {!article.userActive && '(Đã ngừng hoạt động)'}
                      </div>
                      <div className='text-gray-600 flex items-center space-x-1'>
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
                            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                        <span>
                          {new Date(article?.publishDate).toLocaleDateString(
                            'vi-VN'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social actions */}
                  <div className='flex items-center space-x-3'>
                    <button className='p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-all duration-200 transform hover:scale-110'>
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
                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        />
                      </svg>
                    </button>
                    <button className='p-2 rounded-full bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 transition-all duration-200 transform hover:scale-110'>
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
                          d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                        />
                      </svg>
                    </button>
                    <button className='p-2 rounded-full bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600 transition-all duration-200 transform hover:scale-110'>
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
                          d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
                  <p className='text-lg text-gray-700 leading-relaxed font-medium'>
                    {article?.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className='px-8 mb-8'>
              <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
                <img
                  src={
                    article?.image || '/placeholder.svg?height=400&width=800'
                  }
                  alt={article?.title}
                  className='w-full h-64 md:h-96 object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
              </div>
            </div>

            {/* Content */}
            <div className='px-8 pb-8'>
              <div className='prose prose-lg max-w-none'>
                {article?.content &&
                  article?.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;

                    return (
                      <p
                        key={index}
                        className='text-gray-700 leading-relaxed mb-6 text-lg'
                      >
                        {paragraph.trim()}
                      </p>
                    );
                  })}
              </div>

              {/* Article footer */}
              <div className='mt-12 pt-8 border-t border-gray-200'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <span className='text-gray-600 font-medium'>
                      Chia sẻ bài viết:
                    </span>
                    <div className='flex space-x-2'>
                      <button className='p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200'>
                        <svg
                          className='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                        </svg>
                      </button>
                      <button className='p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200'>
                        <svg
                          className='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' />
                        </svg>
                      </button>
                      <button className='p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200'>
                        <svg
                          className='w-4 h-4'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className='text-sm text-gray-500'>
                    <span>
                      Cập nhật lần cuối:{' '}
                      {new Date(article?.publishDate).toLocaleDateString(
                        'vi-VN'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20'>
            <CommentList
              comments={comments}
              user={user}
              token={token}
              fetchComments={fetchComments}
              article={article}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
