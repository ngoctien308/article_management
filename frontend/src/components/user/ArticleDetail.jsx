import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import CommentList from './CommentList';

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  const { user, token } = useContext(AuthContext);

  const fetchComments = async () => {
    const res = await axios.get(
      'http://localhost:3000/api/comments?articleId=' + id
    );
    setComments(res.data.comments);
  };

  const fetchArticle = async () => {
    const res = await axios.get('http://localhost:3000/api/articles/' + id);
    setArticle(res.data.article[0]);
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
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
      'Công nghệ': 'bg-blue-100 text-blue-800',
      'Kinh doanh': 'bg-green-100 text-green-800',
      'Du lịch': 'bg-purple-100 text-purple-800',
      'Sức khỏe': 'bg-red-100 text-red-800',
      'Tài chính': 'bg-yellow-100 text-yellow-800',
      'Giáo dục': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Breadcrumb */}
          <nav className='mb-6'>
            <div className='flex items-center space-x-2 text-sm text-gray-600'>
              <Link to='/user/articles' className='hover:text-blue-600'>
                Trang chủ
              </Link>
              <span>/</span>
              <span className='text-gray-900'>{article?.title}</span>
            </div>
          </nav>

          {/* Article Content */}
          <article className='bg-white rounded-lg shadow-md overflow-hidden mb-8'>
            {/* Header */}
            <div className='p-8 pb-6'>
              <div className='flex items-center justify-between mb-4'>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                    article?.categoryName
                  )}`}
                >
                  {article?.categoryName}
                </span>
                <div className='flex items-center text-sm text-gray-500 space-x-4'>
                  <span className='flex items-center'>
                    <svg
                      className='w-4 h-4 mr-1'
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
                    {article.views} lượt xem
                  </span>
                </div>
              </div>

              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                {article?.title}
              </h1>

              <div className='flex items-center justify-between text-sm text-gray-600 mb-6'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3'>
                    <svg
                      className='w-5 h-5 text-gray-600'
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
                  <div>
                    <div className='font-medium text-gray-900'>
                      {article?.authorName}
                    </div>
                    <div>{formatDate(article?.publishDate)}</div>
                  </div>
                </div>
              </div>

              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                {article?.summary}
              </p>
            </div>

            {/* Featured Image */}
            <div className='px-8 mb-6'>
              <img
                src={article?.image || '/placeholder.svg'}
                alt={article?.title}
                className='w-full h-64 md:h-96 object-cover rounded-lg'
              />
            </div>

            {/* Content */}
            <div className='px-8 pb-8'>
              <div className='prose prose-lg max-w-none'>
                {article?.content &&
                  article?.content.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;

                    if (paragraph.startsWith('##')) {
                      return (
                        <h2
                          key={index}
                          className='text-2xl font-bold text-gray-900 mt-8 mb-4'
                        >
                          {paragraph.replace('##', '').trim()}
                        </h2>
                      );
                    }

                    return (
                      <p
                        key={index}
                        className='text-gray-700 leading-relaxed mb-4'
                      >
                        {paragraph.trim()}
                      </p>
                    );
                  })}
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <CommentList
            comments={comments}
            user={user}
            token={token}
            fetchComments={fetchComments}
            article={article}
          />
        </div>
      </main>
    </div>
  );
};
export default ArticleDetail;
