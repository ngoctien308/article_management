<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Bài viết của tôi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <style>
        .article-card {
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .article-title {
            font-size: 1.3rem;
            font-weight: bold;
        }

        .article-meta {
            font-size: 0.9rem;
            color: #6c757d;
        }

        .content-preview {
            max-height: 4.5em;
            /* Giới hạn khoảng 3 dòng (1.5em * 3) */
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            /* Số dòng muốn hiển thị */
            -webkit-box-orient: vertical;
            line-height: 1.5em;
        }
    </style>
</head>

<body>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg px-4" style='background:rgb(16, 58, 158);'>
        <a class="navbar-brand" href="?controller=article&action=index" style="color: whitesmoke">📰 Article App</a>
        <div class="ms-auto dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="userMenu" data-bs-toggle="dropdown"
                aria-expanded="false">
                👤 <span id="username">User</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                <li><a class="dropdown-item" href="?controller=article&action=myArticles">📄 Bài viết của tôi</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item text-danger" href="#" onclick="signOut()">🚪 Đăng xuất</a></li>
            </ul>
        </div>
    </nav>

    <div class="container py-5">
        <h2 class="mb-4">📚 Danh sách bài báo của tôi</h2>

        <div id="article-list" class="row row-cols-1 row-cols-md-3 g-4">
        </div>
    </div>

    <script>
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
                const user = await finalRes?.user[0];
                document.getElementById('username').textContent = `👋 Xin chào, ${user?.name.toUpperCase()}`;
            } catch (err) {
                console.error('Lỗi khi fetch user:', err);
            }
        }
        fetchLoggedInUser();

        const signOut = () => {
            localStorage.removeItem('token');
            window.location.href = '?controller=auth&action=signin';
        }

        const deleteArticle = async id => {
            await fetch('http://localhost:3000/api/articles/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
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
                if (!articles.length) {
                    container.innerHTML = '<p class="mt-2">Không có bài viết nào.</p>';
                } else {
                    container.innerHTML = '';

                    articles.forEach(article => {
                        const card = document.createElement('div');
                        card.className = 'col';
                        card.innerHTML = `
                        <div class="card h-100 p-3">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text content-preview">${article.content}</p>
                                <div class="text-muted small">
                                    🗓 ${new Date(article.publishDate).toLocaleDateString('vi-VN')}
                                    <br>
                                    👤 ${article.authorName.toUpperCase()}
                                    </br>
                                    🏷 ${article.categoryName}
                                </div>
                                <div class="d-flex gap-2 mt-4">
                                <!-- Nút Sửa -->
                                <a href='?controller=article&action=edit&id=${article.id}' class="btn btn-sm btn-primary">
                                    ✏️ Sửa
                                </a>

                                <!-- Nút Xóa -->
                                <button onclick="deleteArticle(${article.id})" class="btn btn-sm btn-danger">
                                    🗑️ Xóa
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
            }
        }
        fetchArticles();        
    </script>

</body>

</html>