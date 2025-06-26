import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../auth/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AddArticle = () => {
  const location = useLocation();
  const isAdminMode = location.pathname.includes('admin');

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token, user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    userId: 1,
    categoryId: 0
  });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const resImg = await axios.post(
        'http://localhost:3000/api/upload',
        formDataImg,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const res = await axios.post(
        'http://localhost:3000/api/articles',
        {
          title: formData.title,
          summary: formData.summary,
          content: formData.content,
          image: resImg.data.url,
          userId: user.id,
          categoryId: formData.categoryId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.status) {
        toast.success('Thêm thành công');
        if (isAdminMode) {
          navigate('/admin/articles');
        } else {
          navigate('/user/articles');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi khi thêm');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/categories');
        setCategories(res.data.categories);
      } catch (error) {
        toast.error('Có lỗi xảy ra.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-10 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-24 h-24 bg-teal-200 rounded-full opacity-15 animate-bounce animation-delay-1000'></div>
      <div className='absolute bottom-32 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-10 animate-pulse animation-delay-500'></div>

      <main className='relative container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6 shadow-lg'>
              <svg
                className='w-8 h-8 text-emerald-600'
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
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-900 via-teal-800 to-blue-800 bg-clip-text text-transparent mb-4'>
              Tạo bài báo mới
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Chia sẻ câu chuyện của bạn với thế giới. Điền đầy đủ thông tin để
              tạo bài báo chất lượng.
            </p>
            <div className='w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4'></div>
          </div>

          {/* Form */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
            <form onSubmit={handleAddArticle} className='p-8 md:p-12'>
              <div className='space-y-8'>
                {/* Title */}
                <div className='space-y-2'>
                  <label
                    htmlFor='title'
                    className='block text-sm font-semibold text-gray-700'
                  >
                    Tiêu đề bài báo <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z'
                        />
                      </svg>
                    </div>
                    <input
                      value={formData.title}
                      onChange={handleChangeForm}
                      required
                      id='title'
                      name='title'
                      className='block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                      placeholder='Nhập tiêu đề hấp dẫn cho bài báo của bạn...'
                    />
                  </div>
                  <p className='text-xs text-gray-500'>
                    Tiêu đề nên ngắn gọn, súc tích và thu hút người đọc
                  </p>
                </div>

                {/* Category */}
                <div className='space-y-2'>
                  <label
                    htmlFor='categoryId'
                    className='block text-sm font-semibold text-gray-700'
                  >
                    Thể loại <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <svg
                        className='h-5 w-5 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                        />
                      </svg>
                    </div>
                    <select
                      value={formData.categoryId}
                      onChange={handleChangeForm}
                      id='categoryId'
                      name='categoryId'
                      required
                      className='block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                    >
                      <option value=''>Chọn thể loại phù hợp</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div className='space-y-2'>
                  <label
                    htmlFor='image'
                    className='block text-sm font-semibold text-gray-700'
                  >
                    Ảnh bài báo <span className='text-red-500'>*</span>
                  </label>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <div className='relative'>
                        <input
                          required
                          type='file'
                          id='image'
                          name='image'
                          accept='image/*'
                          onChange={handleChangeFile}
                          className='block w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100'
                        />
                      </div>
                      <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
                        <div className='flex items-start space-x-3'>
                          <svg
                            className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          <div className='text-sm text-blue-800'>
                            <p className='font-medium'>Lưu ý về ảnh:</p>
                            <ul className='mt-1 space-y-1 text-xs'>
                              <li>• Chấp nhận JPG, PNG, GIF</li>
                              <li>• Kích thước tối đa 5MB</li>
                              <li>• Nên chọn ảnh có độ phân giải cao</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className='flex items-center justify-center'>
                      {preview ? (
                        <div className='relative group'>
                          <div className='w-full h-48 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden shadow-lg'>
                            <img
                              src={preview}
                              alt='Preview'
                              className='w-full h-full object-cover'
                            />
                          </div>
                        </div>
                      ) : (
                        <div className='w-full h-48 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50'>
                          <div className='text-center'>
                            <svg
                              className='w-12 h-12 text-gray-400 mx-auto mb-4'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                              />
                            </svg>
                            <p className='text-gray-500 text-sm'>
                              Xem trước ảnh sẽ hiển thị ở đây
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className='space-y-2'>
                  <label
                    htmlFor='summary'
                    className='block text-sm font-semibold text-gray-700'
                  >
                    Tóm tắt <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <textarea
                      value={formData.summary}
                      onChange={handleChangeForm}
                      required
                      id='summary'
                      name='summary'
                      rows={4}
                      className='block w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical'
                      placeholder='Viết tóm tắt ngắn gọn, súc tích về nội dung chính của bài báo...'
                    />
                    <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
                      {formData.summary.length}/300
                    </div>
                  </div>
                  <p className='text-xs text-gray-500'>
                    Tóm tắt giúp người đọc hiểu nhanh nội dung bài viết
                  </p>
                </div>

                {/* Content */}
                <div className='space-y-2'>
                  <label
                    htmlFor='content'
                    className='block text-sm font-semibold text-gray-700'
                  >
                    Nội dung chi tiết <span className='text-red-500'>*</span>
                  </label>
                  <div className='relative'>
                    <textarea
                      value={formData.content}
                      onChange={handleChangeForm}
                      required
                      id='content'
                      name='content'
                      rows={12}
                      className='block w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical'
                      placeholder='Viết nội dung đầy đủ của bài báo. Bạn có thể sử dụng ## để tạo tiêu đề phụ...'
                    />
                    <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
                      {formData.content.length} ký tự
                    </div>
                  </div>
                  <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4'>
                    <div className='flex items-start space-x-3'>
                      <svg
                        className='w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                        />
                      </svg>
                      <div className='text-sm text-yellow-800'>
                        <p className='font-medium'>Mẹo viết bài hay:</p>
                        <ul className='mt-1 space-y-1 text-xs'>
                          <li>• Sử dụng "## Tiêu đề" để tạo phần mới</li>
                          <li>• Chia nhỏ đoạn văn để dễ đọc</li>
                          <li>• Kiểm tra chính tả trước khi đăng</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-12 pt-8 border-t border-gray-200'>
                <Link to={isAdminMode ? '/admin/articles' : '/user/articles'}>
                  <button
                    type='button'
                    className='w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 font-medium'
                  >
                    <span className='flex items-center justify-center space-x-2'>
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
                      <span>Hủy bỏ</span>
                    </span>
                  </button>
                </Link>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  <span className='flex items-center justify-center space-x-2'>
                    {isSubmitting ? (
                      <>
                        <svg
                          className='w-4 h-4 animate-spin'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                          />
                        </svg>
                        <span>Đang tạo...</span>
                      </>
                    ) : (
                      <>
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
                        <span>Tạo bài báo</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          {!isAdminMode && (
            <div className='mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-emerald-900 mb-4'>
                  Cần hỗ trợ?
                </h3>
                <p className='text-emerald-700 mb-6'>
                  Nếu bạn gặp khó khăn trong việc tạo bài báo, hãy tham khảo
                  hướng dẫn hoặc liên hệ với chúng tôi.
                </p>
                <div className='flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4'>
                  <button className='px-6 py-2 bg-white text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors duration-200 font-medium'>
                    Xem hướng dẫn
                  </button>
                  <button className='px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium'>
                    Liên hệ hỗ trợ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddArticle;
