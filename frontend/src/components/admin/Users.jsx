import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../auth/AuthContext';
import { MdDeleteOutline } from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert';


const Users = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users');
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi khi tải danh sách người dùng');
    }
  };

  const handleChangeStatus = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users/${userId}/change-status`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Cập nhật trạng thái thành công.');
      fetchUsers();
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    }
  };

  const handleDeleteUser = async (userId) => {
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
                Bạn chắc chắn muốn xóa người dùng này? Hành động này không thể
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
                      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`
                        }
                      });
                      toast.success('Xóa người dùng thành công.');
                      fetchUsers();
                    } catch (error) {
                      console.log(error);
                      toast.error('Có lỗi xảy ra khi xóa người dùng.');
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
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 relative overflow-hidden'>
      {/* Decorative background elements */}
      <div className='absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse'></div>
      <div className='absolute bottom-20 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-15 animate-bounce animation-delay-1000'></div>
      <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-10 animate-pulse animation-delay-500'></div>

      <div className='relative z-10'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-4 mb-2'>
            <div className='p-3 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg'>
              <svg
                className='w-8 h-8 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                />
              </svg>
            </div>
            <div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent'>
                Quản lý người dùng
              </h1>
              <p className='text-gray-600'>
                Quản lý tài khoản và trạng thái người dùng trong hệ thống
              </p>
            </div>
          </div>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full'></div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Tổng người dùng
                </p>
                <p className='text-2xl font-bold text-blue-600'>
                  {users.length}
                </p>
              </div>
              <div className='p-3 rounded-xl bg-blue-100'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Đang hoạt động
                </p>
                <p className='text-2xl font-bold text-green-600'>
                  {users.filter((u) => u.active).length}
                </p>
              </div>
              <div className='p-3 rounded-xl bg-green-100'>
                <svg
                  className='w-6 h-6 text-green-600'
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
              </div>
            </div>
          </div>

          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Bị khóa</p>
                <p className='text-2xl font-bold text-red-600'>
                  {users.filter((u) => !u.active).length}
                </p>
              </div>
              <div className='p-3 rounded-xl bg-red-100'>
                <svg
                  className='w-6 h-6 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'>
          <div className='p-6 border-b border-gray-100'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-gray-900'>
                Danh sách người dùng ({users.length})
              </h2>
              <div className='flex items-center space-x-2 text-sm text-gray-500'>
                <Link
                  to='/admin/users/add'
                  className='cursor-pointer inline-flex items-center px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md'
                >
                  Thêm người dùng
                </Link>
              </div>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              {/* Thead */}
              <thead className='bg-gradient-to-r from-gray-50 to-blue-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    <div className='flex items-center space-x-1'>
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
                          d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                        />
                      </svg>
                      <span>Người dùng</span>
                    </div>
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    <div className='flex items-center space-x-1'>
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
                          d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                        />
                      </svg>
                      <span>Email</span>
                    </div>
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    <div className='flex items-center space-x-1'>
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
                          d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                        />
                      </svg>
                      <span>Mật khẩu</span>
                    </div>
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    <div className='flex items-center space-x-1'>
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
                          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      <span>Trạng thái</span>
                    </div>
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    <div className='flex items-center space-x-1'>
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
                          d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      <span>Hành động</span>
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Tbody */}
              <tbody className='bg-white divide-y divide-gray-200'>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className='hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group'
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center space-x-3'>
                          <div className='relative'>
                            <div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg'>
                              <svg
                                className='w-5 h-5 text-white'
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
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.active ? 'bg-green-400' : 'bg-red-400'
                                }`}
                            ></div>
                          </div>
                          <div>
                            <div className='text-sm font-semibold text-gray-900'>
                              {user.name}
                            </div>
                            <div className='text-xs text-gray-500'>
                              ID: #{user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          {user.email}
                        </div>
                        <div className='text-xs text-gray-500'>
                          Email liên hệ
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center space-x-2'>
                          <div className='text-sm text-gray-400 font-mono'>
                            ••••••••
                          </div>
                          <button className='text-gray-400 hover:text-gray-600 transition-colors duration-200'>
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
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {user.active ? (
                          <div className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200'>
                            <div className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></div>
                            Hoạt động
                          </div>
                        ) : (
                          <div className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200'>
                            <div className='w-2 h-2 bg-red-400 rounded-full mr-2'></div>
                            Chưa kích hoạt
                          </div>
                        )}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() => handleChangeStatus(user.id)}
                            className={`cursor-pointer inline-flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md ${user.active
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white'
                              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                              }`}
                          >
                            <svg
                              className='w-3 h-3 mr-1'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              {user.active ? (
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728'
                                />
                              ) : (
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M5 13l4 4L19 7'
                                />
                              )}
                            </svg>
                            {user.active ? 'Khóa' : 'Kích hoạt'}
                          </button>
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className='inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md'
                          >
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
                                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                              />
                            </svg>
                            Chỉnh sửa
                          </Link>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className='cursor-pointer inline-flex gap-1 items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md'
                          >
                            <MdDeleteOutline />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className='px-6 py-12 text-center'>
                      <div className='flex flex-col items-center space-y-4'>
                        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                          <svg
                            className='w-8 h-8 text-gray-400'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                            />
                          </svg>
                        </div>
                        <div className='text-center'>
                          <h3 className='text-lg font-medium text-gray-900 mb-1'>
                            Không tìm thấy người dùng
                          </h3>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
