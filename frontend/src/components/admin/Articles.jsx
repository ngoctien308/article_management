import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { TiPencil } from 'react-icons/ti';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/articles');
      setArticles(res.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className='p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl mb-6'>Quản lý bài báo</h1>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr className='bg-gray-100 text-left '>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Tiêu đề
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Thể loại
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Tóm tắt
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Ảnh
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Tác giả
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Ngày đăng
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Lượt xem
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article) => (
              <tr
                key={article.id}
                className='border-t border-gray-300 hover:bg-gray-50 font-light'
              >
                <td className='py-2 px-4'>{article.title}</td>
                <td className='py-2 px-4'>{article.categoryName}</td>
                <td className='py-2 px-4 max-w-xs'>
                  <p className='truncate'>{article.summary}</p>
                </td>
                <td className='py-2 px-4'>
                  <img
                    src={article.image}
                    className='w-8 h-8 rounded object-center object-cover'
                  />
                </td>
                <td className='py-2 px-4'>{article.authorName}</td>
                <td className='py-2 px-4'>
                  {new Date(article.publishDate).toLocaleDateString()}
                </td>
                <td className='py-2 px-4'>{article.views}</td>
                <td className='py-2 px-4 space-x-2'>
                  <button className='text-blue-400 hover:text-blue-700 cursor-pointer'>
                    <TiPencil />
                  </button>
                  <button className='text-red-400 hover:text-red-700 cursor-pointer'>
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='4' className='py-4 text-center text-gray-500'>
                Không có bài báo nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Articles;
