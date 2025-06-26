import { NavLink } from 'react-router-dom';
import { CiHome } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';
import { MdOutlineArticle } from 'react-icons/md';
import { BiCategoryAlt } from 'react-icons/bi';
import { CiLogout } from 'react-icons/ci';

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
      isActive ? 'bg-blue-200 text-blue-700 font-semibold' : 'text-gray-700'
    }`;

  return (
    <aside className='h-screen w-64 bg-white shadow-lg p-6 fixed left-0 top-0'>
      <div className='mb-10'>
        <h1 className='text-2xl font-bold text-blue-600'>Admin Panel</h1>
        <button
          className='flex gap-1 items-center border rounded-lg border-gray-300 px-4 py-2 mt-2 cursor-pointer hover:bg-gray-300 transition-all'
          onClick={handleLogout}
        >
          <CiLogout />
          Đăng xuất
        </button>
      </div>

      <nav className='flex flex-col gap-2'>
        <NavLink to='/admin/dashboard' className={navLinkClass}>
          <CiHome />
          Dashboard
        </NavLink>

        <NavLink to='/admin/users' className={navLinkClass}>
          <CiUser />
          Người dùng
        </NavLink>

        <NavLink to='/admin/articles' className={navLinkClass}>
          <MdOutlineArticle />
          Bài viết
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
