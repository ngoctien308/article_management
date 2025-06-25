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
            <Comment
              key={comment.id}
              comment={comment}
              user={user}
              StarRating={StarRating}
              formatDate
              token={token}
              fetchComments={fetchComments}
              article={article}
            />
          ))}
        </div>

        {comments.length === 0 && (
          <div className='text-center py-8 text-gray-500'>
            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
