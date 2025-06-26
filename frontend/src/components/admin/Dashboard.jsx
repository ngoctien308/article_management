import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    totalComments: 0,
    topArticles: [],
    latestArticles: []
  });

  const fetchStats = async () => {
    try {
      const [userRes, articleRes, commentRes] = await Promise.all([
        axios.get('http://localhost:3000/api/users'),
        axios.get('http://localhost:3000/api/articles'),
        axios.get('http://localhost:3000/api/comments')
      ]);

      const { articles } = articleRes.data;

      const topArticles = [...articles]
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);

      const latestArticles = [...articles]
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 3);

      setStats({
        totalUsers: userRes.data.users.length,
        totalArticles: articles.length,
        totalComments: commentRes.data.comments.length,
        topArticles,
        latestArticles
      });
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu dashboard:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-6'>📊 Tổng quan quản trị</h1>

      {/* Cards thống kê */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='bg-white shadow rounded p-4'>
          <h2 className='text-xl font-semibold uppercase'>👤 Người dùng</h2>
          <p className='text-3xl font-bold text-blue-600'>{stats.totalUsers}</p>
        </div>
        <div className='bg-white shadow rounded p-4'>
          <h2 className='text-xl font-semibold uppercase'>📰 Bài viết</h2>
          <p className='text-3xl font-bold text-green-600'>
            {stats.totalArticles}
          </p>
        </div>
        <div className='bg-white shadow rounded p-4'>
          <h2 className='text-xl font-semibold uppercase'>💬 Bình luận</h2>
          <p className='text-3xl font-bold text-purple-600'>
            {stats.totalComments}
          </p>
        </div>
      </div>

      {/* Top bài viết nổi bật */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold uppercase mb-4'>
          🔥 Bài viết nổi bật
        </h2>
        <div className='space-y-2'>
          {stats.topArticles.map((a) => (
            <div
              key={a.id}
              className='bg-white p-4 rounded shadow flex justify-between'
            >
              <div>
                <h3 className='font-semibold'>{a.title}</h3>
                <p className='text-sm text-gray-500'>Lượt xem: {a.views}</p>
              </div>
              <img
                src={a.image}
                alt={a.title}
                className='w-16 h-16 object-cover rounded'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bài viết mới nhất */}
      <div>
        <h2 className='text-xl font-bold mb-4'>🆕 Bài viết mới</h2>
        <ul className='space-y-2'>
          {stats.latestArticles.map((a) => (
            <li
              key={a.id}
              className='flex items-center gap-3 bg-white p-4 rounded shadow'
            >
              <img
                src={a.image}
                alt={a.title}
                className='w-14 h-14 object-cover rounded'
              />
              <div>
                <p className='font-medium'>{a.title}</p>
                <p className='text-sm text-gray-500'>
                  {new Date(a.publishDate).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
