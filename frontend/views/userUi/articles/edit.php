<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Sửa bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</head>

<body class="bg-light">
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
        <h2 class="mb-4">📝 Sửa bài viết</h2>

        <form id="editForm">
            <div class="mb-3">
                <label class="form-label">Tiêu đề</label>
                <input type="text" class="form-control" id="title" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Nội dung</label>
                <textarea class="form-control" id="content" rows="5" required></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Thể loại</label>
                <select class="form-select" id="categoryId" required>
                    <option value="">-- Chọn thể loại --</option>
                    <!-- JS sẽ render thêm -->
                </select>
            </div>

            <button type="submit" class="btn btn-primary">💾 Lưu thay đổi</button>
            <a href="?controller=article&action=myArticles" class="btn btn-secondary">⬅ Quay lại</a>
        </form>
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

        // Fetch user
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

        //

        const articleId = new URLSearchParams(window.location.search).get('id');

        const fetchArticle = async () => {
            const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
                headers: { Authorization: 'Bearer ' + token }
            });
            const { article } = await res.json();

            document.getElementById('title').value = article[0].title;
            document.getElementById('content').value = article[0].content;
            loadCategories(article[0].categoryId);
        };
        fetchArticle();

        const loadCategories = async (selectedId) => {
            const res = await fetch('http://localhost:3000/api/categories');
            const { categories } = await res.json();
            console.log(categories)
            const select = document.getElementById('categoryId');
            categories.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.name;
                if (c.id === selectedId) opt.selected = true;
                select.appendChild(opt);
            });
        };

        document.getElementById('editForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const updatedArticle = {
                title: document.getElementById('title').value,
                content: document.getElementById('content').value,
                categoryId: document.getElementById('categoryId').value
            };

            const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(updatedArticle)
            });

            const result = await res.json();
            if (result?.status) {
                window.location.href = '?controller=article&action=myArticles';
            }
        });
    </script>
</body>

</html>