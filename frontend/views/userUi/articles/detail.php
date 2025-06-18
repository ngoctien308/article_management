<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Chi tiết bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/article_management/frontend/views/userUi/css/detail.css">
</head>

<body>
    <!-- Enhanced Header - Same as index page -->
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

    <!-- CHI TIẾT BÀI VIẾT -->
    <div class="container py-5 mt-4">
        <div class="article-card fade-in">
            <div class="article-header">
                <h1 id="article-title" class="article-title"></h1>
                <div class="article-meta" id="article-meta"></div>
            </div>
            <div class="article-body">
                <div id="article-content" class="article-content"></div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="article-category" id="article-category"></span>
                    <button onclick="goBack()" id="btnBack" class="back-btn">
                        <i class="fas fa-arrow-left"></i>
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- COMMENTS SECTION -->
    <div class="container">
        <div class="comments-section fade-in">
            <h4 class="comments-title">
                <i class="fas fa-comments"></i>
                Bình luận
            </h4>

            <!-- Form gửi bình luận -->
            <form id="commentForm" class="comment-form">
                <div class="mb-3">
                    <textarea id="commentContent" class="form-control comment-textarea" rows="4"
                        placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..." required></textarea>
                </div>
                <button type="submit" class="submit-btn">
                    <i class="fas fa-paper-plane"></i>
                    Gửi bình luận
                </button>
            </form>

            <!-- Danh sách bình luận -->
            <div id="commentList" class="mt-4">
                <div class="loading">
                    <div class="spinner"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let user, article;
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get('id');

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
                document.getElementById('username').textContent = `${user?.name.toUpperCase()}`;
            } catch (err) {
                console.error('Lỗi khi fetch user:', err);
            }
        }

        const signOut = () => {
            localStorage.removeItem('token');
            window.location.href = '?controller=auth&action=signin';
        }

        const fetchArticle = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/articles/${articleId}`);
                const finalRes = await res.json();
                article = finalRes.article[0];

                // Đổ dữ liệu lên UI
                document.getElementById('article-title').textContent = article.title;
                document.getElementById('article-meta').innerHTML = `
                    <div class="meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-user"></i>
                        <span>${article.authorName}</span>
                    </div>
                `;
                document.getElementById('article-content').textContent = article.content;
                document.getElementById('article-category').innerHTML = `
                    <i class="fas fa-tag me-2"></i>${article.categoryName}
                `;
            } catch (err) {
                console.error('Lỗi khi fetch bài viết:', err);
            }
        }

        fetchLoggedInUser();
        fetchArticle();

        // COMMENTS
        const loadComments = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/comments?articleId=${articleId}`);
                const { comments } = await res.json();
                const list = document.getElementById('commentList');
                list.innerHTML = '';

                if (comments && comments.length > 0) {
                    comments.forEach((comment, index) => {
                        const myComment = comment?.userId == user?.id;
                        const div = document.createElement('div');
                        div.className = 'comment-item fade-in';
                        div.style.animationDelay = `${index * 0.1}s`;
                        div.innerHTML = `
                            <div class="comment-header">
                                <div>
                                    <div class="comment-author">
                                        <i class="fas fa-user-circle"></i>
                                        ${comment?.userName}
                                        ${comment.userId == article.userId ? '<span class="author-badge">Tác giả</span>' : ''}
                                    </div>
                                    <div class="comment-time">
                                        <i class="fas fa-clock"></i>
                                        ${new Date(comment?.createdAt).toLocaleString('vi-VN')}
                                    </div>
                                </div>
                                ${myComment ? `
                                <div class="comment-actions">
                                    <button onclick="editComment(${comment.id}, '${comment.content.replace(/'/g, "\\'")}' )" class="action-btn edit-btn" title="Chỉnh sửa">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="deleteComment(${comment.id})" class="action-btn delete-btn" title="Xóa">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                                ` : ''}
                            </div>
                            <div class="comment-content">${comment?.content}</div>
                        `;
                        list.appendChild(div);
                    });
                } else {
                    list.innerHTML = `
                        <div class="text-center py-4 text-muted">
                            <i class="fas fa-comments fa-3x mb-3"></i>
                            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
                        </div>
                    `;
                }
            } catch (err) {
                console.error('Lỗi khi tải bình luận:', err);
            }
        };

        // Wait for user to be loaded before loading comments
        setTimeout(loadComments, 500);

        document.getElementById('commentForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const content = document.getElementById('commentContent').value;

            try {
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
            } catch (err) {
                console.error('Lỗi khi gửi bình luận:', err);
            }
        });

        const deleteComment = async (id) => {
            if (confirm('Bạn có chắc muốn xóa bình luận này?')) {
                try {
                    await fetch(`http://localhost:3000/api/comments/${id}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    });
                    loadComments();
                } catch (err) {
                    console.error('Lỗi khi xóa bình luận:', err);
                }
            }
        }

        const editComment = async (id, oldContent) => {
            const content = prompt('Nhập nội dung mới:', oldContent);
            if (content && content.trim() !== '') {
                try {
                    await fetch(`http://localhost:3000/api/comments/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        },
                        body: JSON.stringify({ content })
                    });
                    loadComments();
                } catch (err) {
                    console.error('Lỗi khi chỉnh sửa bình luận:', err);
                }
            }
        }
    </script>
</body>

</html>