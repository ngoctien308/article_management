import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../auth/AuthContext';
import { confirmAlert } from 'react-confirm-alert';

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    rating: 0,
    content: ''
  });

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

  // Component hiển thị sao
  const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    return (
      <div className='flex items-center space-x-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type='button'
            onClick={() => !readonly && onRatingChange && onRatingChange(star)}
            className={`${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transition-transform`}
            disabled={readonly}
          >
            <svg
              className={`w-5 h-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          </button>
        ))}
        {readonly && (
          <span className='ml-2 text-sm text-gray-600'>({rating}/5)</span>
        )}
      </div>
    );
  };

  // Tính rating trung bình
  const averageRating =
    comments.length > 0
      ? (
          comments.reduce((sum, comment) => sum + comment.rating, 0) /
          comments.length
        ).toFixed(1)
      : 0;

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/api/comments',
        {
          articleId: id,
          userId: user.id,
          content: newComment.content,
          rating: newComment.rating
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Thêm bình luận thành công.');
      setNewComment({
        rating: 0,
        content: ''
      });
      fetchComments();
    } catch (error) {
      toast.error('Lỗi thêm bình luận');
    }
  };

  const handleEditComment = async (comment) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='bg-white rounded-xl p-8 shadow-lg'>
            <h1 className='text-lg font-bold mb-4'>Sửa bình luận</h1>
            <form>
              <div className='flex gap-2 items-center'>
                <label>Đánh giá</label>
                <select
                  required
                  className='border border-gray-300 rounded px-2 py-1'
                  value={newComment.rating}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      rating: Number(e.target.value)
                    }))
                  }
                >
                  <option value='1'>1 sao</option>
                  <option value='2'>2 sao</option>
                  <option value='3'>3 sao</option>
                  <option value='4'>4 sao</option>
                  <option value='5'>5 sao</option>
                </select>
              </div>
              <div className='flex gap-2 items-center'>
                <label>Nội dung bình luận</label>
                <textarea
                  className='border rounded-md p-2 border-gray-300'
                  placeholder='Nội dung bình luận'
                  value={newComment.content}
                  onChange={(e) => {
                    setNewComment((prev) => ({
                      ...prev,
                      content: e.target.value
                    }));
                  }}
                ></textarea>
              </div>
            </form>
            <div className='mt-6 flex justify-end space-x-4'>
              <button
                className='bg-gray-200 px-4 py-2 rounded'
                onClick={onClose}
              >
                Hủy
              </button>
              <button className='bg-red-600 text-white px-4 py-2 rounded'>
                Cập nhật
              </button>
            </div>
          </div>
        );
      }
    });
  };

  const handleDeleteComment = async (id) => {
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
                      'http://localhost:3000/api/comments/' + id,
                      {
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`
                        }
                      }
                    );
                    toast.error('Xóa thành công.');
                    fetchComments();
                  } catch (error) {
                    toast.error('Lỗi khi xóa bình luận.');
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
          <div className='bg-white rounded-lg shadow-md p-8'>
            <div className='mb-8'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  Bình luận ({comments.length})
                </h2>
                <div className='flex items-center space-x-2'>
                  <StarRating rating={Math.round(averageRating)} readonly />
                  <span className='text-sm text-gray-600'>
                    {averageRating}/5 ({comments.length} đánh giá)
                  </span>
                </div>
              </div>

              {/* Add Comment Form */}
              <form
                className='mb-8 p-6 bg-gray-50 rounded-lg'
                onSubmit={handleAddComment}
              >
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Thêm bình luận
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Đánh giá <span className='text-red-500'>*</span>
                    </label>
                    <select
                      required
                      className='border border-gray-300 rounded px-2 py-1'
                      value={newComment.rating}
                      onChange={(e) => {
                        setNewComment((prev) => ({
                          ...prev,
                          rating: e.target.value
                        }));
                      }}
                    >
                      <option value=''>Chọn số sao</option>
                      <option value='1'>1 sao</option>
                      <option value='2'>2 sao</option>
                      <option value='3'>3 sao</option>
                      <option value='4'>4 sao</option>
                      <option value='5'>5 sao</option>
                    </select>
                  </div>
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='content'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Nội dung bình luận <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    value={newComment.content}
                    onChange={(e) => {
                      setNewComment((prev) => ({
                        ...prev,
                        content: e.target.value
                      }));
                    }}
                    rows={4}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical'
                    placeholder='Chia sẻ suy nghĩ của bạn về bài viết...'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                >
                  Gửi bình luận
                </button>
              </form>

              {/* Comments List */}
              <div className='space-y-6'>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='border-b border-gray-200 pb-6 last:border-b-0'
                  >
                    <div className='flex items-start space-x-4'>
                      <div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0'>
                        <svg
                          className='w-6 h-6 text-gray-600'
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
                        <div className='flex items-center justify-between mb-2'>
                          <div>
                            <div className='flex gap-2'>
                              <h4 className='text-gray-900 uppercase font-bold'>
                                {comment.userName}
                              </h4>
                              {comment.userId == user.id && (
                                <div>
                                  <button
                                    onClick={() => {
                                      setNewComment((prev) => ({
                                        ...prev,
                                        content: comment.content,
                                        rating: comment.rating
                                      }));
                                      console.log(newComment);

                                      handleEditComment(comment);
                                    }}
                                    className='transition-all cursor-pointer hover:bg-transparent hover:border-amber-400 hover:text-amber-400 border p-1 bg-amber-400 text-white border-transparent rounded'
                                  >
                                    <CiEdit />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                    className='ml-2 transition-all cursor-pointer hover:bg-transparent hover:border-red-400 hover:text-red-400 border p-1 bg-red-400 text-white border-transparent rounded'
                                  >
                                    <MdDeleteOutline />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className='flex items-center space-x-2 mt-1'>
                              <StarRating rating={comment.rating} readonly />
                              <span className='text-sm text-gray-500'>
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className='text-gray-700 leading-relaxed'>
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className='text-center py-8 text-gray-500'>
                  <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ArticleDetail;
