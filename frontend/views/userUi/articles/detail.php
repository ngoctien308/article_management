<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Chi tiết bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
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

    <!-- CHI TIẾT BÀI VIẾT -->
    <div class="container py-5">
        <div class="card shadow-lg">
            <div class="card-body">
                <h1 id="article-title" class="card-title mb-3"></h1>
                <div class="text-muted mb-3" id="article-meta"></div>
                <p id="article-content" class="card-text fs-5"></p>
                <hr>
                <p><strong>Thể loại:</strong> <span id="article-category"></span></p>
                <button onclick="goBack()" id="btnBack" class="btn btn-secondary mt-3">← Quay lại</button>
            </div>
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

        const goBack = () => {
            history.back();
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

        const signOut = () => {
            localStorage.removeItem('token');
            window.location.href = '?controller=auth&action=signin';
        }


        const fetchArticle = async () => {
            const params = new URLSearchParams(window.location.search);
            const res = await fetch(`http://localhost:3000/api/articles/${params.get('id')}`);
            const finalRes = await res.json();
            const article = finalRes.article[0];

            // Đổ dữ liệu lên UI
            document.getElementById('article-title').textContent = article.title;
            document.getElementById('article-meta').innerHTML =
                `🗓 ${new Date(article.publishDate).toLocaleDateString('vi-VN')} | 👤 ${article.authorName}`;
            document.getElementById('article-content').textContent = article.content;
            document.getElementById('article-category').textContent = article.categoryName;
        }

        fetchArticle();
        fetchLoggedInUser();
    </script>

</body>

</html>