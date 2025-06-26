import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { useEffect, useState } from 'react';

const Comment = ({
  comment,
  user,
  StarRating,
  token,
  fetchComments,
  article
}) => {
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [updatedComment, setUpdatedComment] = useState({});

  useEffect(() => {
    setUpdatedComment((prev) => {
      return { ...prev, rating: comment.rating, content: comment.content };
    });
  }, [isEditingMode]);

  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/api/comments/${comment.id}`,
        {
          content: updatedComment.content,
          rating: updatedComment.rating
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Sửa bình luận thành công.');
      fetchComments();
      setIsEditingMode(false);
    } catch (error) {
      toast.error('Lỗi khi sửa bình luận.');
      console.log(error);
      setIsEditingMode(false);
    }
  };

  const handleDeleteComment = async () => {
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
                Bạn chắc chắn muốn xóa bình luận này? Hành động này không thể
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
                        'http://localhost:3000/api/comments/' + comment.id,
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                          }
                        }
                      );
                      toast.success('Xóa thành công.');
                      fetchComments();
                    } catch (error) {
                      toast.error('Lỗi khi xóa bình luận.');
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
    <div className='p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors duration-200'>
      <div className='flex items-start space-x-4'>
        {/* Avatar */}
        <div className='relative flex-shrink-0'>
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
          {/* Online indicator */}
          <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white'></div>
        </div>

        <div className='flex-1 min-w-0'>
          {/* Header */}
          <div className='flex items-start justify-between mb-3'>
            <div className='flex-1'>
              <div className='flex items-center space-x-3 mb-2'>
                <h4 className='text-gray-900 font-semibold text-lg'>
                  {comment.userName}
                </h4>
                {article.userId == comment.userId && (
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200'>
                    <svg
                      className='w-3 h-3 mr-1'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                      />
                    </svg>
                    Tác giả
                  </span>
                )}
              </div>

              {/* Rating and Date */}
              {isEditingMode ? (
                <div className='mb-3'>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Đánh giá
                  </label>
                  <select
                    value={updatedComment.rating}
                    onChange={(e) => {
                      setUpdatedComment((prev) => {
                        return { ...prev, rating: e.target.value };
                      });
                    }}
                    className='border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white'
                  >
                    <option value=''>Chọn số sao</option>
                    <option value='1'>⭐ 1 sao - Rất tệ</option>
                    <option value='2'>⭐⭐ 2 sao - Tệ</option>
                    <option value='3'>⭐⭐⭐ 3 sao - Bình thường</option>
                    <option value='4'>⭐⭐⭐⭐ 4 sao - Tốt</option>
                    <option value='5'>⭐⭐⭐⭐⭐ 5 sao - Xuất sắc</option>
                  </select>
                </div>
              ) : (
                <div className='flex items-center space-x-4 mb-3'>
                  <StarRating rating={comment.rating} readonly />
                  <div className='flex items-center space-x-1 text-sm text-gray-500'>
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
                      {new Date(comment.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {comment.userId == user.id && !isEditingMode && (
              <div className='flex items-center space-x-2 ml-4'>
                <button
                  onClick={() => setIsEditingMode(true)}
                  className='group p-2 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-200 transition-all duration-200 transform hover:scale-110'
                  title='Chỉnh sửa bình luận'
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
                </button>
                <button
                  onClick={() => handleDeleteComment()}
                  className='group p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 transform hover:scale-110'
                  title='Xóa bình luận'
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
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {isEditingMode ? (
            <form onSubmit={handleEditComment} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nội dung bình luận
                </label>
                <textarea
                  value={updatedComment.content}
                  onChange={(e) => {
                    setUpdatedComment((prev) => {
                      return { ...prev, content: e.target.value };
                    });
                  }}
                  rows={3}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical'
                  placeholder='Nhập nội dung bình luận...'
                />
              </div>
              <div className='flex items-center space-x-3'>
                <button
                  type='submit'
                  className='px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium'
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
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <span>Cập nhật</span>
                  </span>
                </button>
                <button
                  type='button'
                  onClick={() => setIsEditingMode(false)}
                  className='px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 font-medium'
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
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                    <span>Hủy</span>
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div className='bg-gray-50 rounded-xl p-4 border border-gray-200'>
              <p className='text-gray-700 leading-relaxed'>{comment.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
