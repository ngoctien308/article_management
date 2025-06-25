import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import Article from './Article';

const MyArticle = () => {
  const [articles, setArticles] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchMyArticles = async () => {
    try {
      const res = await axios.get(
        'http://localhost:3000/api/articles/myArticles',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      setArticles(res.data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50'>
      <section className='bg-white border-b border-gray-400'>
        <div className='container mx-auto px-4 py-12'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Bài báo của bạn
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Cập nhật những thông tin nóng hổi và hữu ích từ nhiều lĩnh vực
              khác nhau
            </p>
            <Link to='/user/add'>
              <button className='border border-gray-300 rounded-lg px-8 py-4 cursor-pointer hover:bg-gray-300 bg-gray-200 mt-4'>
                Thêm bài báo
              </button>
            </Link>
          </div>
        </div>
      </section>

      <main className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {articles.map((article) => (
            <Article
              key={article.id}
              article={article}
              fetchMyArticles={fetchMyArticles}
              token={token}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyArticle;
