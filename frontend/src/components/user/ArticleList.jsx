import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const ArticleList = () => {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get("http://localhost:3000/api/articles")
      setArticles(res.data.articles)
    }
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3000/api/categories")
      setCategories(res.data.categories)
    }
    fetchArticles();
    fetchCategories();
  }, [])

  // Lấy 5 bài viết nổi bật
  const featuredArticles = articles.slice(0, 5)
  // mainFeatured là là bài viết nổi bật chính
  const mainFeatured = featuredArticles[0]
  // sideFeatured là các bài viết nổi bật phụ
  // Chỉ lấy 4 bài viết tiếp theo để hiển thị ở bên cạnh
  const sideFeatured = featuredArticles.slice(1, 5);

  return (
    <div className="min-h-screen bg-white">
      {/* Hiện ngày tháng, nút thêm */}
      <div className="bg-red-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span>{new Date().toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/user/add" className="hover:text-red-200 transition-colors">
                Đăng bài
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header hiển thị category */}
      <header className="bg-white border-b-2 border-red-600 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="hidden md:flex items-center space-x-8">
              {(articles).map((article) => (
                <div
                  key={article.id}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors relative group"
                >
                  {article?.categoryName}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Thanh ngang có animation */}
      <div className="bg-red-50 border-b border-red-200 py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold mr-4 flex-shrink-0">
              TIN MỚI
            </div>
            <div className="flex animate-marquee whitespace-nowrap">
              {articles.slice(0, 3).map((article, index) => (
                <span key={article.id} className="text-gray-700 mr-8">
                  <Link to={`/user/articles/${article.id}`} className="hover:text-red-600">
                    {article.title}
                  </Link>
                  {index < 2 && <span className="mx-4 text-red-600">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {articles.length > 0 ? (
          <div>
            <div className="col-span-12 lg:col-span-8">
              {/* Featured Section */}
              {mainFeatured && (
                <section className="mb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* bài viết mới nhất */}
                    <div className="lg:col-span-2">
                      <div className="relative group cursor-pointer">
                        <Link to={`/user/articles/${mainFeatured.id}`}>
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={mainFeatured.image || "/placeholder.svg?height=400&width=600"}
                              alt={mainFeatured.title}
                              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <div className="mb-2">
                                <span className="bg-red-600 px-2 py-1 rounded text-xs font-semibold">
                                  {mainFeatured.categoryName}
                                </span>
                              </div>
                              <h2 className="text-2xl font-bold mb-2 leading-tight">
                                {mainFeatured.title}
                              </h2>
                              <p className="text-gray-200 text-sm line-clamp-2">
                                {mainFeatured.summary}
                              </p>
                              <div className="flex items-center mt-3 text-xs text-gray-300">
                                <span>{mainFeatured.authorName}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(mainFeatured.publishDate).toLocaleDateString('vi-VN')}</span>
                                <span className="mx-2">•</span>
                                <span>{mainFeatured.views || 0} lượt xem</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* 4 bài viết tiếp theo */}
                    <div className="space-y-4">
                      {sideFeatured.map((article) => (
                        <Link key={article.id} to={`/user/articles/${article.id}`}>
                          <div className="group cursor-pointer">
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  src={article.image}
                                  alt={article.title}
                                  className="w-24 h-16 object-cover rounded group-hover:opacity-80 transition-opacity"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="mb-1">
                                  <span className="text-xs text-red-600 font-semibold">
                                    {article.categoryName}
                                  </span>
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                                  {article.title}
                                </h3>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <span>{new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                                  <span className="mx-1">•</span>
                                  <span>{article.views || 0} lượt xem</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* All Articles Section */}
              {articles.length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mr-4">Tin mới nhất</h2>
                    <div className="flex-1 h-px bg-gray-300"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <Link key={article.id} to={`/user/articles/${article.id}`}>
                        <div className="group cursor-pointer border-b border-gray-200 pb-4">
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                src={article.image || "/placeholder.svg?height=80&width=120"}
                                alt={article.title}
                                className="w-20 h-14 object-cover rounded group-hover:opacity-80 transition-opacity"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="mb-1">
                                <span className="text-xs text-red-600 font-semibold">
                                  {article.categoryName}
                                </span>
                              </div>
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-1 mt-1">
                                {article.summary}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <span>{article.authorName}</span>
                                <span className="mx-1">•</span>
                                <span>{new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Chia bài viết theo thể loại */}
              {
                categories?.map((category) => {
                  if(articles.filter(article => article.categoryName === category.name).length === 0) {
                    return null;
                  }; // Skip rendering this section if no articles in category
                  return (
                    <section key={category.id} className="mb-8">
                      <div className="flex items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900 mr-4">{category.name}</h2>
                        <div className="flex-1 h-px bg-gray-300"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {articles.filter(a => a.categoryName === category.name).map((article) => (
                          <Link key={article.id} to={`/user/articles/${article.id}`}>
                            <div className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-lg mb-3">
                                <img
                                  src={article.image || "/placeholder.svg?height=150&width=250"}
                                  alt={article.title}
                                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                    {article.categoryName}
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
                                {article.title}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                {article.summary}
                              </p>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{article.authorName}</span>
                                <span className="mx-1">•</span>
                                <span>{new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </section>
                  )
                })
              }
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có bài viết nào</h3>
            <p className="text-gray-600 mb-6">Hãy là người đầu tiên chia sẻ bài viết của bạn!</p>
            <Link to="/user/add">
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Thêm bài viết đầu tiên</span>
              </button>
            </Link>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ArticleList

