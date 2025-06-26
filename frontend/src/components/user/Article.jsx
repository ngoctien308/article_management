import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';

const Article = ({ article, fetchMyArticles, token }) => {
  const location = useLocation();
  const isMyArticlePage = location.pathname === '/user/my-articles';

  // Hàm lấy màu cho thể loại
  const getCategoryColor = (category) => {
    const colors = {
      'Giải trí': 'bg-blue-100 text-blue-800',
      'Thể thao': 'bg-green-100 text-green-800',
      'Chính trị': 'bg-purple-100 text-purple-800',
      'Khoa học': 'bg-red-100 text-red-800',
      'Giáo dục': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleDeleteArticle = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='bg-white rounded-xl p-8 shadow-lg'>
            <h1 className='text-lg font-bold mb-4'>Xác nhận</h1>
            <p>Bạn chắc chắn muốn xóa không?</p>
            <div className='mt-6 flex justify-end space-x-4'>
              <button
                className='bg-gray-200 px-4 py-2 rounded'
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                className='bg-red-600 text-white px-4 py-2 rounded'
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
        );
      }
    });
  };

  return (
    <article
      key={article.id}
      className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
    >
      {/* Ảnh bài báo */}
      <div className='relative'>
        <img
          src={article.image || '/placeholder.svg'}
          alt={article.title}
          className='w-full h-48 object-cover'
        />
        {/* Thể loại */}
        <div className='absolute top-4 left-4'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              article.categoryName
            )}`}
          >
            {article.categoryName}
          </span>
        </div>
      </div>

      {/* Nội dung bài báo */}
      <div className='p-6'>
        {/* Tên bài báo */}
        <h2 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 cursor-pointer'>
          {article.title}
        </h2>

        {/* Tóm tắt */}
        <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
          {article.summary}
        </p>

        {/* Thông tin tác giả và ngày */}
        <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
          <div className='flex items-center'>
            {/* Avatar tác giả */}
            <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2'>
              <svg
                className='w-4 h-4 text-gray-600'
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
            <span className='font-medium'>{article.authorName}</span>
          </div>
        </div>

        {/* Ngày đăng */}
        <div className='text-xs text-gray-400 mb-4'>
          {new Date(article.publishDate).toLocaleDateString()}
        </div>

        {/* Nút xem chi tiết */}
        {isMyArticlePage ? (
          <div className='grid grid-cols-3 gap-2 items-center'>
            <Link
              to={`/user/articles/${article.id}`}
              className='flex items-center gap-2 justify-center rounded-lg px-2 py-1 bg-blue-500 text-white hover:bg-blue-700 transition-all cursor-pointer'
            >
              Xem
            </Link>
            <Link
              to={`/user/edit-articles/${article.id}`}
              className='flex items-center gap-2 justify-center rounded-lg px-2 py-1 bg-amber-400 text-white hover:bg-amber-400 transition-all cursor-pointer'
            >
              <FaRegEdit /> Sửa
            </Link>
            <button
              onClick={handleDeleteArticle}
              className='flex items-center gap-2 justify-center rounded-lg px-2 py-1 bg-red-500 text-white hover:bg-red-700 transition-all cursor-pointer'
            >
              <MdDeleteOutline /> Xóa
            </button>
          </div>
        ) : (
          <Link to={`/user/articles/${article.id}`}>
            <button className='cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium'>
              Xem chi tiết
              <svg
                className='w-4 h-4 ml-2 inline'
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
        )}
      </div>
    </article>
  );
};

export default Article;
