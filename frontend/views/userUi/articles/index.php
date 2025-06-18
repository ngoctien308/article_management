<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Danh sách bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/article_management/frontend/views/userUi/css/index.css">
</head>

<body>
    <!-- Enhanced Header -->
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
                <i class="fas fa-book-open me-3"></i>
                Danh sách bài báo
            </h1>
            <p class="page-subtitle">Khám phá những bài viết mới nhất và thú vị nhất</p>
            <a href="?controller=article&action=add" class="create-btn">
                <i class="fas fa-plus"></i>
                Tạo bài viết mới
            </a>
        </div>

        <div id="article-list" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="loading">
                <div class="spinner"></div>
            </div>
        </div>
    </div>

    <script>
        let user;
        // check token
        const getToken = () => {
            const itemStr = localStorage.getItem('token');
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);
            const now = new Date();

            if (now.getTime() > item.expiry) {
                // Token đã hết hạn
                localStorage.removeItem('token');
                return null;
            }

            return item.token;
        }
        const token = getToken();
        if (!token) {
            window.location.href = '?controller=auth&action=signin';
        }

        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/articles');
                const { articles } = await res.json();

                const container = document.getElementById('article-list');
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
                                <a href='?controller=article&action=detail&id=${article.id}' class='detail-btn'>
                                    <i class="fas fa-eye me-2"></i>Xem chi tiết
                                </a>
                            </div>
                        </div>
                        `;
                    container.appendChild(card);
                });
            } catch (err) {
                console.error('Lỗi khi fetch bài viết:', err);
                const container = document.getElementById('article-list');
                container.innerHTML = '<div class="col-12 text-center text-danger">Có lỗi xảy ra khi tải bài viết</div>';
            }
        }
        fetchArticles();

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
    </script>
</body>

</html>