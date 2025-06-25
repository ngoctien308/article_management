import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPasword: ''
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { email, name, password, confirmPasword } = formData;

    if (password !== confirmPasword) {
      return toast.error('Mật khẩu và mật khẩu xác nhận phải giống nhau.');
    }

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        name,
        email,
        password
      });

      toast.success(res?.data.message);
      setFormData({ name: '', email: '', password: '', confirmPasword: '' });
    } catch (error) {
      console.log(error);
      toast.error(error?.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          Đăng ký
        </h2>
        <form className='space-y-4' onSubmit={handleSignUp}>
          <label className='text-gray-600'>Tên người dùng</label>
          <input
            required
            value={formData.name}
            name='name'
            onChange={handleInputChange}
            placeholder='Tên người dùng'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <label className='text-gray-600'>Email</label>
          <input
            required
            value={formData.email}
            name='email'
            onChange={handleInputChange}
            type='email'
            placeholder='Email'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <label className='text-gray-600'>Mật khẩu</label>
          <input
            required
            value={formData.password}
            name='password'
            onChange={handleInputChange}
            type='password'
            placeholder='Mật khẩu'
            className='border-gray-300 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <label className='text-gray-600'>Xác nhận mật khẩu</label>
          <input
            required
            value={formData.confirmPasword}
            name='confirmPasword'
            onChange={handleInputChange}
            type='password'
            placeholder='Xác nhận mật khẩu'
            className='border-gray-300 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button
            type='submit'
            className={`w-full py-2 rounded-lg cursor-pointer text-white bg-blue-600 hover:bg-blue-700 transition duration-300`}
          >
            Đăng ký
          </button>
          <p>
            Đã có tài khoản?{' '}
            <Link className='text-blue-500 hover:underline' to='/user/signin'>
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
