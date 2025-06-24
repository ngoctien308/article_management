import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get('http://localhost:3000/api/articles');
      setArticles(res.data.articles);
    };
    fetchArticles();
  }, []);

  // Hàm format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-white border-b border-gray-400'>
        <div className='container mx-auto px-4 py-12'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Tin tức mới nhất
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Cập nhật những thông tin nóng hổi và hữu ích từ nhiều lĩnh vực
              khác nhau
            </p>
            <Link to='/user/add'>
              <button className='border border-gray-300 rounded-lg px-8 py-4 cursor-pointer hover:bg-gray-300 bg-gray-200 mt-4'>
                Thêm bài báo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {articles.map((article) => (
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
                  {formatDate(article.publishDate)}
                </div>

                {/* Nút xem chi tiết */}
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
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className='text-center mt-12'>
          <button className='cursor-pointer bg-gray-200 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium'>
            Xem thêm bài viết
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-gray-800 text-white py-8 mt-16'>
        <div className='container mx-auto px-4 text-center'>
          <p>&copy; 2024 Tiến Express. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};
export default ArticleList;
