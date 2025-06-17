<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Danh sách bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
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
    </style>
</head>

<body>
    <nav class="navbar navbar-expand-lg px-4" style='background:rgb(16, 58, 158);'>
        <div class="container-fluid">
            <span class="navbar-brand" style="color: whitesmoke">📰 Article App</span>
            <div class="ms-auto d-flex align-items-center text-white">
                <span id="user-info" class="me-3"></span>
                <button onclick="signOut()" class="btn btn-outline-light btn-sm">Đăng xuất</button>
            </div>
        </div>
    </nav>
    <div class="container py-5">
        <h2 class="mb-4">📚 Danh sách bài báo</h2>

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

        const fetchArticles = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/articles');
                const { articles } = await res.json();

                const container = document.getElementById('article-list');
                container.innerHTML = '';

                articles.forEach(article => {
                    const card = document.createElement('div');
                    card.className = 'col';
                    card.innerHTML = `
                        <div class="card h-100 p-3">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.content}</p>
                                <div class="text-muted small">
                                    🗓 ${new Date(article.publishDate).toLocaleDateString('vi-VN')}
                                    <br>
                                    👤 ${article.authorName.toUpperCase()}
                                    </br>
                                    🏷 ${article.categoryName}
                                </div>
                            </div>
                            <a href='?controller=article&action=detail' class='btn btn-primary'>Xem chi tiết</a>
                        </div>
                        `;
                    container.appendChild(card);
                });
            } catch (err) {
                console.error('Lỗi khi fetch bài viết:', err);
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
                const user = await finalRes?.user[0];
                document.getElementById('user-info').textContent = `👋 Xin chào, ${user?.name.toUpperCase()}`;
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