"use client"

import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link to="/user/articles" className="text-red-600 hover:text-red-700 font-medium">
                            Trang chủ
                        </Link>
                        <span className="text-gray-400">›</span>
                        <span className="text-gray-800 font-medium">Không tìm thấy trang</span>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    {/* 404 Content */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                        {/* Large 404 Number */}
                        <div className="mb-8">
                            <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
                            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
                        </div>

                        {/* Error Message */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy trang</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                            </p>
                            <p className="text-gray-500">
                                Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ để tiếp tục đọc tin tức.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <Link
                                to="/"
                                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Về trang chủ
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Quay lại
                            </button>
                        </div>

                        {/* Search Box */}
                        <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoặc tìm kiếm bài viết</h3>
                            <div className="max-w-md mx-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Nhập từ khóa tìm kiếm..."
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 text-center text-gray-500 text-sm">
                        <p>
                            Nếu bạn cho rằng đây là lỗi, vui lòng{" "}
                            <div className="text-red-600 hover:text-red-700 font-medium">
                                liên hệ với chúng tôi
                            </div>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NotFound
