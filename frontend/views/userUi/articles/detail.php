<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Chi tiết bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <style>
        .comment-box {
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }

        .comment-author {
            font-weight: bold;
            margin-bottom: 5px;
        }

        .comment-time {
            font-size: 0.85rem;
            color: gray;
        }

        .comment-box {
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }

        .comment-author {
            font-weight: bold;
        }

        .btn-group button {
            margin-left: 5px;
        }
    </style>
</head>

<body>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg px-4 fixed-top shadow" style='background:rgb(16, 58, 158);'>
        <a class="navbar-brand" href="?controller=article&action=index" style="color: whitesmoke">📰 Tiến Express</a>
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
    <div class="container py-5 mt-4">
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

    <div class="container mt-5">
        <h4>💬 Bình luận</h4>

        <!-- Form gửi bình luận -->
        <form id="commentForm" class="mb-4">
            <div class="mb-3">
                <textarea id="commentContent" class="form-control" rows="3" placeholder="Nhập bình luận..."
                    required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Gửi bình luận</button>
        </form>

        <!-- Danh sách bình luận -->
        <div id="commentList" class="mt-4">
            <!-- Các bình luận sẽ được thêm bằng JS -->
        </div>
    </div>


    <script>
        let user;
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get('id');
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
                user = await finalRes?.user[0];
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
            const res = await fetch(`http://localhost:3000/api/articles/${articleId}`);
            const finalRes = await res.json();
            const article = finalRes.article[0];

            // Đổ dữ liệu lên UI
            document.getElementById('article-title').textContent = article.title;
            document.getElementById('article-meta').innerHTML =
                `🗓 ${new Date(article.publishDate).toLocaleDateString('vi-VN')} | 👤 ${article.authorName}`;
            document.getElementById('article-content').textContent = article.content;
            document.getElementById('article-category').textContent = article.categoryName;
        }

        fetchLoggedInUser();
        fetchArticle();


        // COMMENTS
        const loadComments = async () => {
            const res = await fetch(`http://localhost:3000/api/comments?articleId=${articleId}`);
            const { comments } = await res.json();
            const list = document.getElementById('commentList');
            list.innerHTML = '';

            comments?.forEach(comment => {
                const myComment = comment?.userId == user?.id;
                const div = document.createElement('div');
                div.className = 'comment-box';
                div.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <div class="comment-author">${comment?.userName}</div>
                            <div class="comment-content">${comment?.content}</div>
                            <div class="comment-time">${new Date(comment?.createdAt).toLocaleString()}</div>
                        </div>
                        ${myComment ? `
                        <div class="btn-group">
                            <button onclick="editComment(${comment.id}, '${comment.content}')" class="btn btn-sm btn-outline-primary">✏️</button>
                            <button onclick="deleteComment(${comment.id})" class="btn btn-sm btn-outline-danger">🗑️</button>
                        </div>
                        ` : ''}
                    </div>
                `;
                list.appendChild(div);
            });
        };
        loadComments();

        document.getElementById('commentForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = document.getElementById('commentContent').value;

            await fetch('http://localhost:3000/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({ articleId, content, userId: user.id })
            });

            document.getElementById('commentContent').value = '';
            loadComments();
        });

        const deleteComment = async (id) => {
            if (confirm('Bạn có chắc muốn xóa bình luận này?')) {
                await fetch(`http://localhost:3000/api/comments/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                loadComments();
            }
        }

        const editComment = async (id, oldContent) => {
            const content = prompt('Nhập nội dung mới:', oldContent);
            if (content) {
                await fetch(`http://localhost:3000/api/comments/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify({ content })
                });
                loadComments();
            }
        }

    </script>

</body>

</html>