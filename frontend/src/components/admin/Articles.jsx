import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../auth/AuthContext';
import {
  FileText,
  Tag,
  User,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Plus,
  TrendingUp,
  Clock,
  ImageIcon
} from 'lucide-react';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/articles');
      setArticles(res.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalArticles = articles.length;
  const avgViews =
    totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;

  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/articles/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Xóa bài báo thành công.');
      fetchArticles();
    } catch (error) {
      console.log(error);
      toast.error('Lỗi khi xóa bài báo.');
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden max-w-[1200px]'>
      {/* Decorative Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl'></div>

        {/* Floating Particles */}
        <div className='absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce'></div>
        <div
          className='absolute top-40 right-32 w-3 h-3 bg-indigo-400/30 rounded-full animate-bounce'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute bottom-32 left-40 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className='relative z-10 p-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg'>
                <FileText className='w-8 h-8 text-white' />
              </div>
              <div>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                  Quản lý bài báo
                </h1>
                <p className='text-gray-600 mt-1'>
                  Quản lý và theo dõi tất cả bài viết trên hệ thống
                </p>
              </div>
            </div>
          </div>

          {/* Thông số */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
            <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg'>
                  <FileText className='w-6 h-6 text-white' />
                </div>
                <span className='text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full'>
                  Tổng số
                </span>
              </div>
              <div className='text-3xl font-bold text-gray-800 mb-1'>
                {totalArticles}
              </div>
              <div className='text-sm text-gray-600'>Bài viết</div>
            </div>

            <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg'>
                  <Eye className='w-6 h-6 text-white' />
                </div>
                <span className='text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full'>
                  Tổng
                </span>
              </div>
              <div className='text-3xl font-bold text-gray-800 mb-1'>
                {totalViews.toLocaleString()}
              </div>
              <div className='text-sm text-gray-600'>Lượt xem</div>
            </div>

            <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <div className='flex items-center justify-between mb-4'>
                <div className='p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg'>
                  <TrendingUp className='w-6 h-6 text-white' />
                </div>
                <span className='text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full'>
                  Trung bình
                </span>
              </div>
              <div className='text-3xl font-bold text-gray-800 mb-1'>
                {avgViews.toLocaleString()}
              </div>
              <div className='text-sm text-gray-600'>Lượt xem/bài</div>
            </div>
          </div>

          {/* Main Content */}
          <div className='bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden'>
            {/* Nút thêm */}
            <div className='p-6 border-b border-gray-200/50 bg-gradient-to-r from-white/50 to-gray-50/50'>
              <div className='flex flex-col lg:flex-row gap-4 justify-between'>
                <Link
                  to='/admin/articles/add'
                  className='flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'
                >
                  <Plus className='w-4 h-4' />
                  Thêm bài viết
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gradient-to-r from-gray-50 to-gray-100/50'>
                  <tr>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      <div className='flex items-center gap-2'>
                        <FileText className='w-4 h-4' />
                        Tiêu đề
                      </div>
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      <div className='flex items-center gap-2'>
                        <Tag className='w-4 h-4' />
                        Thể loại
                      </div>
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      Tóm tắt
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      <div className='flex items-center gap-2'>
                        <ImageIcon className='w-4 h-4' />
                        Ảnh
                      </div>
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      <div className='flex items-center gap-2'>
                        <User className='w-4 h-4' />
                        Tác giả
                      </div>
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4' />
                        Ngày đăng
                      </div>
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      <div className='flex items-center gap-2'>
                        <Eye className='w-4 h-4' />
                        Lượt xem
                      </div>
                    </th>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200/50'>
                  {articles.length > 0 ? (
                    articles.map((article) => (
                      <tr
                        key={article.id}
                        className='hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 group'
                      >
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-3'>
                            <div className='w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                            <div>
                              <div className='font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200'>
                                {article.title}
                              </div>
                              <div className='text-xs text-gray-500 mt-1'>
                                ID: {article.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'>
                            {article.categoryName}
                          </span>
                        </td>
                        <td className='px-6 py-4 max-w-[140px]'>
                          <p
                            className='text-sm text-gray-600 truncate'
                            title={article.summary}
                          >
                            {article.summary}
                          </p>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='relative group/image'>
                            <img
                              src={article.image || '/placeholder.svg'}
                              alt={article.title}
                              className='w-12 h-12 rounded-xl object-cover shadow-md group-hover/image:shadow-lg transition-shadow duration-200'
                            />
                            <div className='absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-200'></div>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium'>
                              {article.authorName.charAt(0).toUpperCase()}
                            </div>
                            <span className='text-sm font-medium text-gray-700'>
                              {article.authorName}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Clock className='w-4 h-4' />
                            {new Date(article.publishDate).toLocaleDateString(
                              'vi-VN'
                            )}
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg'>
                              <Eye className='w-4 h-4 text-green-600' />
                              <span className='text-sm font-medium text-green-700'>
                                {article.views.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-2'>
                            <Link
                              to={`/admin/articles/edit/${article.id}`}
                              className='p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group/edit'
                            >
                              <Edit3 className='w-4 h-4 group-hover/edit:scale-110 transition-transform duration-200' />
                            </Link>
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group/delete'
                            >
                              <Trash2 className='w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='8' className='px-6 py-12 text-center'>
                        <div className='flex flex-col items-center gap-4'>
                          <div className='w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center'>
                            <FileText className='w-8 h-8 text-gray-400' />
                          </div>
                          <div>
                            <h3 className='text-lg font-medium text-gray-900 mb-1'>
                              Không có bài báo nào
                            </h3>
                          </div>
                          <button className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105'>
                            <Plus className='w-4 h-4' />
                            Tạo bài viết đầu tiên
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Results Info */}
            {articles.length > 0 && (
              <div className='px-6 py-4 bg-gradient-to-r from-gray-50/50 to-white/50 border-t border-gray-200/50'>
                <div className='text-sm text-gray-600 flex items-center gap-4'>
                  <span>Tổng lượt xem: {totalViews.toLocaleString()}</span>
                  <span>•</span>
                  <span>
                    Trung bình: {avgViews.toLocaleString()} lượt xem/bài
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
