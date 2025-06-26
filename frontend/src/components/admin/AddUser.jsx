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
  Edit3,
  PlusCircle
} from 'lucide-react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Thêm thành công.');
      navigate('/admin/users');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
                <PlusCircle className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'>
                  Tạo tài khoản người dùng
                </h1>
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
                    Tạo thông tin cá nhân và bảo mật
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className='p-8'>
              <form onSubmit={handleAddUser} className='space-y-6'>
                {/* Name Field */}
                <div className='group'>
                  <label className='flex items-center gap-2 text-sm font-medium text-slate-700 mb-3'>
                    <User className='w-4 h-4 text-slate-500' />
                    Tên người dùng
                  </label>
                  <div className='relative'>
                    <input
                      value={formData.name}
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
                      value={formData.email}
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
                    className='flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                  >
                    <Save className='w-4 h-4' />
                    <span>Tạo</span>
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
        </div>
      </div>
    </div>
  );
};

export default AddUser;
