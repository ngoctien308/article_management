import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Comment from './Comment';

const CommentList = ({ comments, user, token, fetchComments, article }) => {
  const [newComment, setNewComment] = useState({
    rating: 0,
    content: ''
  });

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
              readonly
                ? 'cursor-default'
                : 'cursor-pointer hover:scale-110 hover:rotate-12'
            } transition-all duration-200`}
            disabled={readonly}
          >
            <svg
              className={`w-6 h-6 ${
                star <= rating
                  ? 'text-yellow-400 fill-current drop-shadow-sm'
                  : 'text-gray-300'
              } transition-colors duration-200`}
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          </button>
        ))}
        {readonly && (
          <span className='ml-2 text-sm text-gray-600 font-medium'>
            ({rating}/5)
          </span>
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
          articleId: article.id,
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

  return (
    <div className='p-8'>
      <div className='mb-8'>
        {/* Header Section */}
        <div className='flex items-center justify-between mb-8 pb-6 border-b border-gray-200'>
          <div className='flex items-center space-x-4'>
            <div className='p-3 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100'>
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
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
            </div>
            <div>
              <h2 className='text-3xl font-bold text-gray-900'>Bình luận</h2>
              <p className='text-gray-600'>
                {comments.length} người đã bình luận
              </p>
            </div>
          </div>

          {/* Average Rating Display */}
          <div className='text-right'>
            <div className='flex items-center justify-end space-x-2 mb-2'>
              <StarRating rating={Math.round(averageRating)} readonly />
            </div>
            <div className='text-sm text-gray-600'>
              <span className='font-semibold text-lg text-gray-900'>
                {averageRating}
              </span>
              /5 trên <span className='font-medium'>{comments.length}</span>{' '}
              đánh giá
            </div>
          </div>
        </div>

        {/* Add Comment Form */}
        <div className='mb-10'>
          <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200/50 shadow-lg'>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center'>
                <svg
                  className='w-5 h-5 text-white'
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
              </div>
              <h3 className='text-xl font-bold text-gray-900'>
                Chia sẻ ý kiến của bạn
              </h3>
            </div>

            <form onSubmit={handleAddComment} className='space-y-6'>
              {/* Rating Selection */}
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-3'>
                  Đánh giá bài viết <span className='text-red-500'>*</span>
                </label>
                <div className='flex items-center space-x-4'>
                  <StarRating
                    rating={newComment.rating}
                    onRatingChange={(rating) =>
                      setNewComment((prev) => ({
                        ...prev,
                        rating: rating
                      }))
                    }
                  />
                  <select
                    required
                    className='border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    value={newComment.rating}
                    onChange={(e) => {
                      setNewComment((prev) => ({
                        ...prev,
                        rating: Number.parseInt(e.target.value)
                      }));
                    }}
                  >
                    <option value=''>Chọn số sao</option>
                    <option value='1'>⭐ 1 sao - Rất tệ</option>
                    <option value='2'>⭐⭐ 2 sao - Tệ</option>
                    <option value='3'>⭐⭐⭐ 3 sao - Bình thường</option>
                    <option value='4'>⭐⭐⭐⭐ 4 sao - Tốt</option>
                    <option value='5'>⭐⭐⭐⭐⭐ 5 sao - Xuất sắc</option>
                  </select>
                </div>
              </div>

              {/* Comment Content */}
              <div>
                <label
                  htmlFor='content'
                  className='block text-sm font-semibold text-gray-700 mb-3'
                >
                  Nội dung bình luận <span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <textarea
                    id='content'
                    value={newComment.content}
                    onChange={(e) => {
                      setNewComment((prev) => ({
                        ...prev,
                        content: e.target.value
                      }));
                    }}
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200 bg-white/80 backdrop-blur-sm'
                    placeholder='Chia sẻ suy nghĩ của bạn về bài viết này... Bạn thích điều gì nhất? Có gì cần cải thiện không?'
                    required
                  />
                  <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
                    {newComment.content.length}/500
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium'
                >
                  <span className='flex items-center space-x-2'>
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
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                      />
                    </svg>
                    <span>Gửi bình luận</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        <div className='space-y-6'>
          {comments.length > 0 ? (
            <>
              <div className='flex items-center space-x-2 mb-6'>
                <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1'></div>
                <span className='text-gray-500 font-medium px-4'>
                  Tất cả bình luận
                </span>
                <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1'></div>
              </div>

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className='transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
                >
                  <div className='bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300'>
                    <Comment
                      comment={comment}
                      user={user}
                      StarRating={StarRating}
                      token={token}
                      fetchComments={fetchComments}
                      article={article}
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            /* Empty State */
            <div className='text-center py-16'>
              <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6'>
                <svg
                  className='w-10 h-10 text-gray-400'
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
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Chưa có bình luận nào
              </h3>
              <p className='text-gray-600 mb-6 max-w-md mx-auto'>
                Hãy là người đầu tiên chia sẻ ý kiến về bài viết này. Đánh giá
                và bình luận của bạn sẽ giúp tác giả cải thiện nội dung.
              </p>
              <div className='flex items-center justify-center space-x-2 text-gray-400'>
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
                <span className='text-sm'>
                  Cuộn lên để thêm bình luận đầu tiên
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Comments Stats */}
        {comments.length > 0 && (
          <div className='mt-12 pt-8 border-t border-gray-200'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl'>
                <div className='text-2xl font-bold text-blue-600'>
                  {comments.length}
                </div>
                <div className='text-sm text-blue-700'>Tổng bình luận</div>
              </div>
              <div className='text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {averageRating}
                </div>
                <div className='text-sm text-yellow-700'>Điểm trung bình</div>
              </div>
              <div className='text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl'>
                <div className='text-2xl font-bold text-green-600'>
                  {comments.filter((c) => c.rating >= 4).length}
                </div>
                <div className='text-sm text-green-700'>Đánh giá tích cực</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
