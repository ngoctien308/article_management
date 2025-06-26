// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../../auth/AuthContext';

// const EditUser = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({});
//   const [formData, setFormData] = useState({});
//   const { token } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/users/${id}`);
//       setUser(res.data.user[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleOnChange = (e) => {
//     setFormData((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

//   const handleUserUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.patch(`http://localhost:3000/api/users/${id}`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });
//       toast.success('Cập nhật thành công.');
//       navigate('/admin/users');
//     } catch (error) {
//       if (error.response.data.message?.includes('Duplicate')) {
//         toast.error('Trùng email.');
//       } else toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     setFormData((prev) => {
//       return {
//         ...prev,
//         email: user.email,
//         name: user.name,
//         password: user.password
//       };
//     });
//   }, [user]);

//   return (
//     <div className='p-6 bg-white shadow-md rounded-lg'>
//       <h1 className='text-2xl mb-6'>Cập nhật tài khoản người dùng</h1>
//       <form className='max-w-[300px]' onSubmit={handleUserUpdate}>
//         <div className='flex flex-col gap-2'>
//           <label className='font-light'>Tên</label>
//           <input
//             value={formData.name}
//             name='name'
//             onChange={handleOnChange}
//             required
//             className='font-light border rounded-lg border-gray-300 px-2 py-1'
//           />
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label className='font-light'>Email</label>
//           <input
//             value={formData.email}
//             name='email'
//             onChange={handleOnChange}
//             required
//             className='font-light border rounded-lg border-gray-300 px-2 py-1'
//           />
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label className='font-light'>Mật khẩu</label>
//           <input
//             value={formData.password}
//             name='password'
//             onChange={handleOnChange}
//             required
//             className='font-light border rounded-lg border-gray-300 px-2 py-1'
//           />
//         </div>
//         <button
//           type='submit'
//           className='cursor-pointer rounded px-2 py-1 bg-blue-500 text-white mt-2 hover:bg-blue-400 transition-all'
//         >
//           Cập nhật
//         </button>
//         <Link
//           to='/admin/users'
//           className='cursor-pointer border rounded px-2 py-1 border-gray-300 mt-2 ml-2 hover:bg-gray-300 transition-all'
//         >
//           Hủy
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default EditUser;

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../auth/AuthContext';
import {
  User,
  Mail,
  Lock,
  Save,
  X,
  ArrowLeft,
  Shield,
  Edit3
} from 'lucide-react';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:3000/api/users/${id}`);
      setUser(res.data.user[0]);
    } catch (error) {
      console.log(error);
      toast.error('Không thể tải thông tin người dùng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.patch(`http://localhost:3000/api/users/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Cập nhật thành công.');
      navigate('/admin/users');
    } catch (error) {
      if (error.response.data.message?.includes('Duplicate')) {
        toast.error('Trùng email.');
      } else toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        email: user.email,
        name: user.name,
        password: user.password
      };
    });
  }, [user]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden'>
        {/* Decorative Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl'></div>
        </div>

        <div className='relative z-10 p-6'>
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8'>
              <div className='animate-pulse'>
                <div className='h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-6'></div>
                <div className='space-y-6'>
                  <div className='h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl'></div>
                  <div className='h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl'></div>
                  <div className='h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden'>
      {/* Decorative Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-indigo-400/10 rounded-full blur-3xl'></div>

        {/* Floating Elements */}
        <div className='absolute top-20 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse'></div>
        <div className='absolute top-40 right-32 w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse delay-1000'></div>
        <div className='absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse delay-500'></div>
      </div>

      <div className='relative z-10 p-6'>
        <div className='max-w-2xl mx-auto'>
          {/* Header Section */}
          <div className='mb-8'>
            <Link
              to='/admin/users'
              className='inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 mb-4 group'
            >
              <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200' />
              <span className='text-sm font-medium'>Quay lại danh sách</span>
            </Link>

            <div className='flex items-center gap-4 mb-2'>
              <div className='p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg'>
                <Edit3 className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
                  Cập nhật tài khoản người dùng
                </h1>
                <p className='text-slate-600 mt-1'>
                  Chỉnh sửa thông tin người dùng #{id}
                </p>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className='bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden'>
            {/* Card Header */}
            <div className='bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-white/20 p-6'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-lg'>
                  <Shield className='w-5 h-5 text-blue-600' />
                </div>
                <div>
                  <h2 className='text-xl font-semibold text-slate-800'>
                    Thông tin người dùng
                  </h2>
                  <p className='text-sm text-slate-600'>
                    Cập nhật thông tin cá nhân và bảo mật
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className='p-8'>
              <form onSubmit={handleUserUpdate} className='space-y-6'>
                {/* Name Field */}
                <div className='group'>
                  <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-3'>
                    <User className='w-4 h-4 text-slate-500' />
                    Tên người dùng
                  </label>
                  <div className='relative'>
                    <input
                      value={formData.name || ''}
                      name='name'
                      onChange={handleOnChange}
                      required
                      className='w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 group-hover:border-slate-300'
                      placeholder='Nhập tên người dùng'
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
                  </div>
                </div>

                {/* Email Field */}
                <div className='group'>
                  <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-3'>
                    <Mail className='w-4 h-4 text-slate-500' />
                    Địa chỉ email
                  </label>
                  <div className='relative'>
                    <input
                      value={formData.email || ''}
                      name='email'
                      type='email'
                      onChange={handleOnChange}
                      required
                      className='w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 group-hover:border-slate-300'
                      placeholder='Nhập địa chỉ email'
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
                  </div>
                </div>

                {/* Password Field */}
                <div className='group'>
                  <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-3'>
                    <Lock className='w-4 h-4 text-slate-500' />
                    Mật khẩu
                  </label>
                  <div className='relative'>
                    <input
                      value={formData.password}
                      name='password'
                      onChange={handleOnChange}
                      required
                      className='w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 placeholder-slate-400 group-hover:border-slate-300'
                      placeholder='Nhập mật khẩu mới'
                    />
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none'></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200/50'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        <span>Đang cập nhật...</span>
                      </>
                    ) : (
                      <>
                        <Save className='w-4 h-4' />
                        <span>Cập nhật</span>
                      </>
                    )}
                  </button>

                  <Link
                    to='/admin/users'
                    className='flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                  >
                    <X className='w-4 h-4' />
                    <span>Hủy</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Info Card */}
          <div className='mt-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 backdrop-blur-sm rounded-xl border border-blue-200/30 p-4'>
            <div className='flex items-start gap-3'>
              <div className='p-2 bg-blue-100/50 rounded-lg'>
                <Shield className='w-4 h-4 text-blue-600' />
              </div>
              <div className='flex-1'>
                <h3 className='text-sm font-medium text-blue-900 mb-1'>
                  Lưu ý bảo mật
                </h3>
                <p className='text-xs text-blue-700/80 leading-relaxed'>
                  Việc thay đổi thông tin người dùng sẽ ảnh hưởng đến khả năng
                  đăng nhập của họ. Hãy đảm bảo thông báo cho người dùng về
                  những thay đổi này.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
