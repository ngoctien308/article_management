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

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Thêm bài báo mới
            </h1>
            <p className='text-gray-600'>
              Điền đầy đủ thông tin để tạo bài báo mới
            </p>
          </div>

          {/* Form */}
          <form
            className='bg-white rounded-lg shadow-md p-8'
            onSubmit={handleEditArticle}
          >
            <div className='space-y-6'>
              {/* Tiêu đề */}
              <div>
                <label
                  htmlFor='title'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tiêu đề bài báo <span className='text-red-500'>*</span>
                </label>
                <input
                  value={formData.title}
                  onChange={handleChangeForm}
                  required
                  id='title'
                  name='title'
                  className={`border-gray-300 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 `}
                  placeholder='Nhập tiêu đề bài báo...'
                />
              </div>

              {/* Thể loại */}
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Thể loại <span className='text-red-500'>*</span>
                </label>
                <select
                  id='categoryId'
                  name='categoryId'
                  value={formData.categoryId}
                  onChange={handleChangeForm}
                  required
                  className={`border-gray-300 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <option value=''>Chọn thể loại</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ảnh đại diện */}
              <div>
                <div className='flex gap-2 items-center'>
                  <label
                    htmlFor='image'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Ảnh bài báo <span className='text-red-500'>*</span>
                  </label>
                  <img
                    src={article.image}
                    className='w-8 h-8 object-cover rounded-full object-center'
                  />
                </div>
                <div className='flex items-start space-x-4 mt-2'>
                  <div className='flex-1'>
                    <input
                      type='file'
                      id='image'
                      onChange={handleChangeFile}
                      name='image'
                      accept='image/*'
                      className={`border-gray-300 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    <p className='mt-1 text-sm text-gray-500'>
                      Chấp nhận JPG, PNG, GIF. Tối đa 5MB.
                    </p>
                  </div>

                  {preview && (
                    <div className='w-32 h-32 border rounded-lg overflow-hidden'>
                      <img
                        src={preview}
                        alt='Preview'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tóm tắt */}
              <div>
                <label
                  htmlFor='summary'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Tóm tắt <span className='text-red-500'>*</span>
                </label>
                <textarea
                  value={formData.summary}
                  onChange={handleChangeForm}
                  required
                  id='summary'
                  name='summary'
                  rows={4}
                  className={`border-gray-300 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical`}
                  placeholder='Nhập tóm tắt ngắn gọn về bài báo...'
                />
              </div>

              {/* Nội dung chi tiết */}
              <div>
                <label
                  htmlFor='content'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Nội dung chi tiết <span className='text-red-500'>*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={handleChangeForm}
                  required
                  id='content'
                  name='content'
                  rows={12}
                  className={`border-gray-300 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical`}
                  placeholder='Nhập nội dung đầy đủ của bài báo...'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-400'>
              <Link to='/user/my-articles'>
                <button
                  type='button'
                  className='cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200'
                >
                  Hủy
                </button>
              </Link>
              <button
                type='submit'
                className={`cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
              >
                Cập nhật bài báo
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditArticle;
