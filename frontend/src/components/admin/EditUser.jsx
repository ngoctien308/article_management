import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../auth/AuthContext';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/${id}`);
      setUser(res.data.user[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

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

  return (
    <div className='p-6 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl mb-6'>Cập nhật tài khoản người dùng</h1>
      <form className='max-w-[300px]' onSubmit={handleUserUpdate}>
        <div className='flex flex-col gap-2'>
          <label className='font-light'>Tên</label>
          <input
            value={formData.name}
            name='name'
            onChange={handleOnChange}
            required
            className='font-light border rounded-lg border-gray-300 px-2 py-1'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-light'>Email</label>
          <input
            value={formData.email}
            name='email'
            onChange={handleOnChange}
            required
            className='font-light border rounded-lg border-gray-300 px-2 py-1'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-light'>Mật khẩu</label>
          <input
            value={formData.password}
            name='password'
            type='password'
            onChange={handleOnChange}
            required
            className='font-light border rounded-lg border-gray-300 px-2 py-1'
          />
        </div>
        <button
          type='submit'
          className='cursor-pointer rounded px-2 py-1 bg-blue-500 text-white mt-2 hover:bg-blue-400 transition-all'
        >
          Cập nhật
        </button>
        <Link
          to='/admin/users'
          className='cursor-pointer border rounded px-2 py-1 border-gray-300 mt-2 ml-2 hover:bg-gray-300 transition-all'
        >
          Hủy
        </Link>
      </form>
    </div>
  );
};

export default EditUser;
