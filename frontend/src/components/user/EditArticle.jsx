import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../auth/AuthContext';

const EditArticle = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [article, setArticle] = useState({});
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticle = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/articles/' + id);
      setArticle(res.data.article[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/categories');
      setCategories(res.data.categories);
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchArticle();
    fetchCategories();
  }, []);

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        title: article?.title,
        categoryId: article?.categoryId,
        summary: article?.summary,
        content: article?.content
      };
    });
  }, [article]);

  const handleEditArticle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataImg = new FormData();
    formDataImg.append('image', file);
    let resImg;

    try {
      if (file) {
        // upload anh trc
        resImg = await axios.post(
          'http://localhost:3000/api/upload',
          formDataImg,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }

      await axios.patch(
        `http://localhost:3000/api/articles/${id}`,
        {
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
          summary: formData.summary,
          image: !file ? article.image : resImg.data.url
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Chỉnh sửa bài báo thành công.');
      navigate('/user/my-articles');
    } catch (error) {
      console.log(error);
      toast.error('Lỗi khi chỉnh sửa bài báo.');
    } finally {
      setIsSubmitting(false);
    }
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

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50'>
        <main className='container mx-auto px-4 py-8'>
          <div className='max-w-4xl mx-auto'>
            {/* Loading skeleton */}
            <div className='animate-pulse'>
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8'>
                <div className='text-center space-y-4'>
                  <div className='h-12 bg-gray-200 rounded w-1/2 mx-auto'></div>
                  <div className='h-6 bg-gray-200 rounded w-3/4 mx-auto'></div>
                </div>
              </div>
              <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8'>
                <div className='space-y-6'>
                  <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                  <div className='h-12 bg-gray-200 rounded'></div>
                  <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                  <div className='h-12 bg-gray-200 rounded'></div>
                  <div className='h-32 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-10 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-15 animate-bounce animation-delay-1000'></div>
      <div className='absolute bottom-32 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-10 animate-pulse animation-delay-500'></div>

      <main className='relative container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mb-6 shadow-lg'>
              <svg
                className='w-8 h-8 text-amber-600'
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
            </div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-900 via-orange-800 to-yellow-800 bg-clip-text text-transparent mb-4'>
              Chỉnh sửa bài báo
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Cập nhật và hoàn thiện nội dung bài viết của bạn
            </p>
            <div className='w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4'></div>
          </div>

          {/* Current Article Info */}
          <div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-200'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <img
                  src={article.image || '/placeholder.svg?height=60&width=60'}
                  className='w-15 h-15 object-cover rounded-xl shadow-lg'
                  alt='Current article'
                />
                <div className='absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-3 h-3 text-white'
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
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-amber-900 mb-1'>
                  Đang chỉnh sửa:
                </h3>
                <p className='text-amber-800 font-medium'>{article.title}</p>
                <p className='text-sm text-amber-600 mt-1'>
                  Được tạo:{' '}
                  {new Date(article.publishDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
            <form onSubmit={handleEditArticle} className='p-8 md:p-12'>
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
                      value={formData.title || ''}
                      onChange={handleChangeForm}
                      required
                      id='title'
                      name='title'
                      className='block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
                      placeholder='Nhập tiêu đề hấp dẫn cho bài báo của bạn...'
                    />
                  </div>
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
                      id='categoryId'
                      name='categoryId'
                      value={formData.categoryId || ''}
                      onChange={handleChangeForm}
                      required
                      className='block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white'
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
                    Ảnh bài báo
                  </label>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                    <div className='space-y-4'>
                      {/* Current Image Display */}
                      <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
                        <div className='flex items-center space-x-3 mb-3'>
                          <svg
                            className='w-5 h-5 text-amber-600'
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
                          <span className='text-sm font-medium text-amber-800'>
                            Ảnh hiện tại:
                          </span>
                        </div>
                        <img
                          src={
                            article.image ||
                            '/placeholder.svg?height=80&width=120'
                          }
                          className='w-20 h-20 object-cover rounded-lg shadow-md'
                          alt='Current'
                        />
                      </div>

                      {/* File Input */}
                      <div className='space-y-2'>
                        <input
                          type='file'
                          id='image'
                          onChange={handleChangeFile}
                          name='image'
                          accept='image/*'
                          className='block w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100'
                        />
                        <p className='text-xs text-gray-500'>
                          Để trống nếu không muốn thay đổi ảnh. Chấp nhận JPG,
                          PNG, GIF. Tối đa 5MB.
                        </p>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className='flex items-center justify-center'>
                      {preview ? (
                        <div className='relative group'>
                          <div className='w-full h-48 border-2 border-dashed border-amber-300 rounded-xl overflow-hidden shadow-lg'>
                            <img
                              src={preview || '/placeholder.svg'}
                              alt='New Preview'
                              className='w-full h-full object-cover'
                            />
                          </div>
                          <div className='absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium'>
                            Ảnh mới
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
                              Chọn ảnh mới để xem trước
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
                      value={formData.summary || ''}
                      onChange={handleChangeForm}
                      required
                      id='summary'
                      name='summary'
                      rows={4}
                      className='block w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical'
                      placeholder='Cập nhật tóm tắt ngắn gọn, súc tích về nội dung chính...'
                    />
                    <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
                      {(formData.summary || '').length}/300
                    </div>
                  </div>
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
                      value={formData.content || ''}
                      onChange={handleChangeForm}
                      required
                      id='content'
                      name='content'
                      rows={12}
                      className='block w-full px-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-vertical'
                      placeholder='Cập nhật nội dung đầy đủ của bài báo...'
                    />
                    <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
                      {(formData.content || '').length} ký tự
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-12 pt-8 border-t border-gray-200'>
                <Link to='/user/my-articles'>
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
                  className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
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
                        <span>Đang cập nhật...</span>
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
                        <span>Cập nhật bài báo</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Changes Summary */}
          <div className='mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200'>
            <div className='text-center'>
              <h3 className='text-lg font-semibold text-amber-900 mb-2'>
                Lưu ý khi chỉnh sửa
              </h3>
              <p className='text-amber-700 text-sm'>
                Những thay đổi sẽ được lưu ngay lập tức. Hãy kiểm tra kỹ nội
                dung trước khi cập nhật.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditArticle;
