<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Bài viết của tôi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/article_management/frontend/views/userUi/css/myArticles.css">
</head>

<body>
    <!-- Enhanced Header - Same as other pages -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <a class="navbar-brand" href="?controller=article&action=index">
            <i class="fas fa-newspaper"></i>
            Tiến Express
        </a>
        <div class="ms-auto dropdown">
            <a class="btn dropdown-toggle" href="#" role="button" id="userMenu" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fas fa-user-circle"></i>
                <span id="username">User</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                <li><a class="dropdown-item" href="?controller=article&action=myArticles">
                        <i class="fas fa-file-alt me-2"></i>Bài viết của tôi
                    </a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item text-danger" href="#" onclick="signOut()">
                        <i class="fas fa-sign-out-alt me-2"></i>Đăng xuất
                    </a></li>
            </ul>
        </div>
    </nav>

    <div class="container py-5 mt-4">
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-user-edit"></i>
                Bài viết của tôi
            </h1>
            <p class="page-subtitle">Quản lý và chỉnh sửa các bài viết bạn đã tạo</p>
            <a href="?controller=article&action=add" class="create-btn">
                <i class="fas fa-plus"></i>
                Tạo bài viết mới
            </a>
        </div>

        <!-- Statistics Bar -->
        <div class="stats-bar fade-in">
            <div class="stat-item">
                <div class="stat-number" id="totalArticles">0</div>
                <div class="stat-label">Tổng bài viết</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="thisMonthArticles">0</div>
                <div class="stat-label">Bài viết tháng này</div>
            </div>
        </div>

        <div id="article-list" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="loading">
                <div class="spinner"></div>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="delete-modal" id="deleteModal">
        <div class="delete-modal-content">
            <div class="delete-modal-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="delete-modal-title">Xác nhận xóa bài viết</div>
            <div class="delete-modal-text">
                Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.
            </div>
            <div class="delete-modal-buttons">
                <button class="confirm-delete-btn" id="confirmDeleteBtn">
                    <i class="fas fa-trash me-2"></i>Xóa bài viết
                </button>
                <button class="cancel-delete-btn" id="cancelDeleteBtn">
                    <i class="fas fa-times me-2"></i>Hủy bỏ
                </button>
            </div>
        </div>
    </div>

    <script>
        let user;
        let articleToDelete = null;

        // check token
        const getToken = () => {
            const itemStr = localStorage.getItem('token');
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                localStorage.removeItem('token');
                return null;
            }

            return item.token;
        }

        const token = getToken();

        if (!token) {
            window.location.href = '?controller=auth&action=signin';
        }

        const fetchLoggedInUser = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/info', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const finalRes = await res.json();
                user = await finalRes?.user[0];
                document.getElementById('username').textContent = `${user?.name.toUpperCase()}`;
            } catch (err) {
                console.error('Lỗi khi fetch user:', err);
            }
        }
        fetchLoggedInUser();

        const signOut = () => {
            localStorage.removeItem('token');
            window.location.href = '?controller=auth&action=signin';
        }

        // Delete Modal Functions
        const showDeleteModal = (articleId, articleTitle) => {
            articleToDelete = articleId;
            document.querySelector('.delete-modal-text').innerHTML =
                `Bạn có chắc chắn muốn xóa bài viết "<strong>${articleTitle}</strong>" không? Hành động này không thể hoàn tác.`;
            document.getElementById('deleteModal').style.display = 'flex';
        }

        const hideDeleteModal = () => {
            articleToDelete = null;
            document.getElementById('deleteModal').style.display = 'none';
        }

        const deleteArticle = async (id) => {
            try {
                const loadingBtn = document.getElementById('confirmDeleteBtn');
                loadingBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Đang xóa...';
                loadingBtn.disabled = true;

                await fetch('http://localhost:3000/api/articles/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                hideDeleteModal();
                fetchArticles(); // Reload articles
            } catch (err) {
                console.error('Lỗi khi xóa bài viết:', err);
                alert('Có lỗi xảy ra khi xóa bài viết!');
            } finally {
                const loadingBtn = document.getElementById('confirmDeleteBtn');
                loadingBtn.innerHTML = '<i class="fas fa-trash me-2"></i>Xóa bài viết';
                loadingBtn.disabled = false;
            }
        }

        // Calculate statistics
        const calculateStats = (articles) => {
            const total = articles.length;
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            const thisMonth = articles.filter(article => {
                const articleDate = new Date(article.publishDate);
                return articleDate.getMonth() === currentMonth &&
                    articleDate.getFullYear() === currentYear;
            }).length;

            document.getElementById('totalArticles').textContent = total;
            document.getElementById('thisMonthArticles').textContent = thisMonth;
        }

        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/articles/myArticles', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const { articles } = await res.json();

                const container = document.getElementById('article-list');

                // Calculate and display statistics
                calculateStats(articles);

                if (!articles.length) {
                    container.innerHTML = `
                        <div class="col-12">
                            <div class="empty-state fade-in">
                                <div class="empty-icon">
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <div class="empty-title">Chưa có bài viết nào</div>
                                <div class="empty-subtitle">
                                    Hãy tạo bài viết đầu tiên của bạn để chia sẻ với cộng đồng!
                                </div>
                                <a href="?controller=article&action=add" class="create-btn">
                                    <i class="fas fa-plus"></i>
                                    Tạo bài viết đầu tiên
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    container.innerHTML = '';

                    articles.forEach((article, index) => {
                        const card = document.createElement('div');
                        card.className = 'col fade-in';
                        card.style.animationDelay = `${index * 0.1}s`;
                        card.innerHTML = `
                            <div class="card article-card h-100">
                                <div class="card-body">
                                    <h5 class="article-title">${article.title}</h5>
                                    <p class="content-preview">${article.content}</p>
                                    <div class="article-meta">
                                        <div class="meta-item">
                                            <i class="fas fa-calendar-alt meta-icon"></i>
                                            <span>${new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <div class="meta-item">
                                            <i class="fas fa-user meta-icon"></i>
                                            <span class="author-name">${article.authorName.toUpperCase()}</span>
                                        </div>
                                        <div class="meta-item">
                                            <i class="fas fa-tag meta-icon"></i>
                                            <span class="category-tag">${article.categoryName}</span>
                                        </div>
                                    </div>
                                    <div class="action-buttons">
                                        <a href='?controller=article&action=edit&id=${article.id}' class="edit-btn">
                                            <i class="fas fa-edit"></i>
                                            Chỉnh sửa
                                        </a>
                                        <button onclick="showDeleteModal(${article.id}, '${article.title.replace(/'/g, "\\'")}' )" class="delete-btn">
                                            <i class="fas fa-trash"></i>
                                            Xóa bài
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                }
            } catch (err) {
                console.error('Lỗi khi fetch bài viết:', err);
                const container = document.getElementById('article-list');
                container.innerHTML = `
                    <div class="col-12">
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="empty-title">Có lỗi xảy ra</div>
                            <div class="empty-subtitle">
                                Không thể tải danh sách bài viết. Vui lòng thử lại sau.
                            </div>
                            <button onclick="fetchArticles()" class="create-btn">
                                <i class="fas fa-refresh"></i>
                                Thử lại
                            </button>
                        </div>
                    </div>
                `;
            }
        }

        fetchArticles();

        // Modal event listeners
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            if (articleToDelete) {
                deleteArticle(articleToDelete);
            }
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', hideDeleteModal);

    </script>

</body>

</html>