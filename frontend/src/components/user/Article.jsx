import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';

const Article = ({ article, fetchMyArticles, token }) => {
  const location = useLocation();
  const isMyArticlePage = location.pathname === '/user/my-articles';

  // Hàm lấy màu cho thể loại
  const getCategoryColor = (category) => {
    const colors = {
      'Giải trí':
        'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300',
      'Thể thao':
        'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300',
      'Chính trị':
        'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-300',
      'Khoa học':
        'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300',
      'Giáo dục':
        'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-indigo-300'
    };
    return (
      colors[category] ||
      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300'
    );
  };

  const handleDeleteArticle = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-full transform transition-all'>
              {/* Icon */}
              <div className='flex justify-center mb-6'>
                <div className='p-3 rounded-full bg-red-100'>
                  <svg
                    className='w-8 h-8 text-red-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                </div>
              </div>

              <h1 className='text-2xl font-bold mb-4 text-center text-gray-900'>
                Xác nhận xóa
              </h1>
              <p className='text-gray-600 text-center mb-8'>
                Bạn chắc chắn muốn xóa bài viết này? Hành động này không thể
                hoàn tác.
              </p>

              <div className='flex space-x-4'>
                <button
                  className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105'
                  onClick={onClose}
                >
                  Hủy bỏ
                </button>
                <button
                  className='flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  onClick={async () => {
                    try {
                      await axios.delete(
                        'http://localhost:3000/api/articles/' + article.id,
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                          }
                        }
                      );
                      toast.success('Xóa thành công.');
                      fetchMyArticles();
                    } catch (error) {
                      toast.error('Lỗi khi xóa bài báo.');
                      console.log(error);
                    }
                    onClose();
                  }}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <article className='group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-white/20'>
      {/* Ảnh bài báo */}
      <div className='relative overflow-hidden'>
        <img
          src={article.image || '/placeholder.svg?height=200&width=400'}
          alt={article.title}
          className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110'
        />

        {/* Overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        {/* Thể loại */}
        <div className='absolute top-4 left-4'>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm shadow-lg ${getCategoryColor(
              article.categoryName
            )}`}
          >
            {article.categoryName}
          </span>
        </div>
      </div>

      {/* Nội dung bài báo */}
      <div className='p-6 space-y-4'>
        {/* Tên bài báo */}
        <h2 className='text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight'>
          {article.title}
        </h2>

        {/* Tóm tắt */}
        <p className='text-gray-600 text-sm line-clamp-3 leading-relaxed'>
          {article.summary}
        </p>

        {/* Thông tin tác giả và ngày */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            {/* Avatar tác giả */}
            <div className='relative'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg'>
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
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 bg-${
                  article.userActive ? 'green' : 'red'
                }-400 rounded-full border-2 border-white`}
              ></div>
            </div>
            <div>
              <span className='font-semibold text-gray-900 text-sm'>
                {article.authorName}
              </span>
              <div className='text-xs text-gray-500 flex items-center space-x-1'>
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
                    d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                  />
                </svg>
                <span>
                  {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          {/* Engagement stats */}
          <div className='flex items-center space-x-4 text-gray-400'>
            <div className='flex items-center space-x-1'>
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
              <span className='text-xs'>{article.views}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='pt-4 border-t border-gray-100'>
          {isMyArticlePage ? (
            <div className='grid grid-cols-3 gap-3'>
              <Link
                to={`/user/articles/${article.id}`}
                className='flex items-center justify-center space-x-1 rounded-xl px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-medium'
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
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
                <span>Xem</span>
              </Link>
              <Link
                to={`/user/edit-articles/${article.id}`}
                className='flex items-center justify-center space-x-1 rounded-xl px-3 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-medium'
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
                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                  />
                </svg>
                <span>Sửa</span>
              </Link>
              <button
                onClick={handleDeleteArticle}
                className='flex items-center justify-center space-x-1 rounded-xl px-3 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-medium'
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
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
                <span>Xóa</span>
              </button>
            </div>
          ) : (
            <Link to={`/user/articles/${article.id}`} className='block'>
              <button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl group'>
                <span className='flex items-center justify-center space-x-2'>
                  <span>Xem chi tiết</span>
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
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
    </article>
  );
};

export default Article;
