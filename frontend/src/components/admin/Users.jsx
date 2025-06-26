import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users/${userId}/change-status`
      );
      toast.success('Cập nhật trạng thái thành công.');
      fetchUsers();
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl mb-6'>Quản lý người dùng</h1>
      <table className='min-w-full bg-white border border-gray-200'>
        <thead>
          <tr className='bg-gray-100 text-left '>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Tên
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Email
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Mật khẩu
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Trạng thái
            </th>
            <th className='py-2 px-4 border-b border-gray-300 font-semibold'>
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className='border-t border-gray-300 hover:bg-gray-50 font-light'
              >
                <td className='py-2 px-4'>{user.name}</td>
                <td className='py-2 px-4'>{user.email}</td>
                <td className='py-2 px-4'>{user.password}</td>
                <td className='py-2 px-4'>
                  {user.active ? (
                    <div className='flex items-center gap-2'>
                      <div className='rounded-full w-2 h-2 bg-green-500'></div>{' '}
                      Hoạt động
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <div className='rounded-full w-2 h-2 bg-yellow-500'></div>{' '}
                      Đã bị chặn
                    </div>
                  )}
                </td>
                <td className='py-2 px-4 space-x-2'>
                  <button
                    onClick={() => handleChangeStatus(user.id)}
                    className={`border-transparent rounded-lg px-2 py-1 text-sm text-white cursor-pointer transition-all ${
                      user.active
                        ? 'bg-red-400 hover:bg-red-300'
                        : 'bg-green-500 hover:bg-green-300'
                    }`}
                  >
                    {user.active ? 'Chặn' : 'Kích hoạt'}
                  </button>
                  <Link
                    to={`/admin/users/edit/${user.id}`}
                    className='bg-blue-500 hover:bg-blue-300 border-transparent rounded-lg px-2 py-1 text-sm text-white cursor-pointer transition-all'
                  >
                    Chỉnh sửa
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='4' className='py-4 text-center text-gray-500'>
                Không có người dùng nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
