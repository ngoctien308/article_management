import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
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
  // Hàm format ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDeleteComment = async () => {
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
        );
      }
    });
  };

  return (
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
                <h4 className='text-gray-900 font-bold'>
                  {comment.userName}
                  {article.userId == comment.userId && ' (Tác giả)'}
                </h4>

                <div>
                  {comment.userId == user.id && !isEditingMode && (
                    <>
                      <button
                        onClick={() => setIsEditingMode(true)}
                        className='transition-all cursor-pointer hover:bg-transparent hover:border-amber-400 hover:text-amber-400 border p-1 bg-amber-400 text-white border-transparent rounded'
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteComment()}
                        className='ml-2 transition-all cursor-pointer hover:bg-transparent hover:border-red-400 hover:text-red-400 border p-1 bg-red-400 text-white border-transparent rounded'
                      >
                        <MdDeleteOutline />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {isEditingMode ? (
                <select
                  value={updatedComment.rating}
                  onChange={(e) => {
                    setUpdatedComment((prev) => {
                      return { ...prev, rating: e.target.value };
                    });
                  }}
                  className='border border-gray-300 px-2 py-1 rounded-lg'
                >
                  <option value=''>Chọn số sao</option>
                  <option value='1'>1 sao</option>
                  <option value='2'>2 sao</option>
                  <option value='3'>3 sao</option>
                  <option value='4'>4 sao</option>
                  <option value='5'>5 sao</option>
                </select>
              ) : (
                <div className='flex items-center space-x-2 mt-1'>
                  <StarRating rating={comment.rating} readonly />
                  <span className='text-sm text-gray-500'>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {isEditingMode ? (
            <form className='flex items-end gap-2' onSubmit={handleEditComment}>
              <textarea
                value={updatedComment.content}
                onChange={(e) => {
                  setUpdatedComment((prev) => {
                    return { ...prev, content: e.target.value };
                  });
                }}
                className='border rounded border-gray-300'
              ></textarea>
              <button className='border px-2 py-1 rounded-lg border-gray-300 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition'>
                Cập nhật
              </button>
              <button
                onClick={() => setIsEditingMode(false)}
                className='border px-2 py-1 rounded-lg border-gray-300 cursor-pointer bg-gray-500 text-white hover:bg-gray-600 transition'
              >
                Hủy
              </button>
            </form>
          ) : (
            <p className='text-gray-700 leading-relaxed'>{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
