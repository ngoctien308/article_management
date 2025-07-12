import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleDeleteCategory = async (categoryId) => {
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
                                Bạn chắc chắn muốn xóa thể loại này? Hành động này sẽ khiến tất cả các bài viết liên quan bị mất vĩnh viễn.
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
                                            await axios.delete(`http://localhost:3000/api/categories/${categoryId}`, {
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            });
                                            toast.success('Xóa thể loại thành công.');
                                            fetchCategories();
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

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/categories');
            const { categories } = res.data;
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/categories', { name: newCategory });
            toast.success('Thêm thể loại thành công.');
            setNewCategory('');
            fetchCategories();
            setIsAddMode(false);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm thể loại.');
            console.error('Error adding category:', error);
        }
    }

    useEffect(() => {
        fetchCategories();
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
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM9 7v10m6-10v10"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent'>
                                Quản lý thể loại
                            </h1>
                            <p className='text-gray-600'>
                                Quản lý thể loại bài viết của bạn một cách dễ dàng và hiệu quả.
                            </p>
                        </div>
                    </div>
                    <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full'></div>
                </div>

                {/* Categories Table */}
                <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden'>
                    <div className='p-6 border-b border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-xl font-semibold text-gray-900'>
                                Danh sách thể loại ({categories.length})
                            </h2>
                            {

                                isAddMode ? (<div>
                                    <form className='flex items-center space-x-2' onSubmit={handleAddCategory}>
                                        <input
                                            value={newCategory}
                                            onChange={e => setNewCategory(e.target.value)}
                                            placeholder="Tên thể loại"
                                            className="border border-gray-300 px-2 py-1 rounded-lg"
                                        />
                                        <button
                                            type="submit"
                                            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer">
                                            Thêm
                                        </button>
                                        <button
                                            type="button"
                                            className="px-2 py-1 border border-gray-300 bg-gray-300 hover:bg-gray-400 transition rounded-lg cursor-pointer"
                                            onClick={() => { setIsAddMode(false); setNewCategory('') }}>
                                            Hủy
                                        </button>
                                    </form>
                                </div>) : (<div className='flex items-center space-x-2 text-sm text-gray-500'>
                                    <button
                                        onClick={() => setIsAddMode(true)}
                                        className='cursor-pointer inline-flex items-center px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md'
                                    >
                                        Thêm thể loại
                                    </button>
                                </div>)
                            }

                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            {/* Thead */}
                            <thead className='bg-gradient-to-r from-gray-50 to-blue-50'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        <div className='flex items-center space-x-1'>
                                            <span>Mã thể loại</span>
                                        </div>
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        <div className='flex items-center space-x-1'>
                                            Tên thể loại
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
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <tr
                                            key={category.id}
                                            className='hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group'
                                        >
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                {category.id}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span>{category.name}</span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center space-x-2'>
                                                    <button
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
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteCategory(category.id);
                                                        }}
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
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM9 7v10m6-10v10"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className='text-center'>
                                                    <h3 className='text-lg font-medium text-gray-900 mb-1'>
                                                        Không tìm thấy thể loại
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
    )
}

export default Categories