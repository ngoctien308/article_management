<!-- <!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Sửa bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</head>

<body class="bg-light">
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

    <div class="mt-4 container py-5">
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
                </select>
            </div>

            <button type="submit" class="btn btn-primary">💾 Lưu thay đổi</button>
            <a href="?controller=article&action=myArticles" class="btn btn-secondary">⬅ Quay lại</a>
        </form>
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
                user = await finalRes?.user[0];
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

</html> -->

<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Sửa bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">

    <style>
        :root {
            --primary-color: #1e40af;
            --primary-gradient: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            --secondary-color: #64748b;
            --accent-color: #f59e0b;
            --text-dark: #1f2937;
            --text-light: #6b7280;
            --card-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            --card-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
            --success-color: #10b981;
            --danger-color: #ef4444;
        }

        body {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
        }

        /* Enhanced Navbar - Same as other pages */
        .navbar {
            background: var(--primary-gradient) !important;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 2rem;
        }

        .navbar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: white !important;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: transform 0.3s ease;
        }

        .navbar-brand:hover {
            transform: scale(1.05);
            color: #fbbf24 !important;
        }

        .dropdown-toggle {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: white !important;
            border-radius: 25px !important;
            padding: 0.5rem 1rem !important;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .dropdown-toggle:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            transform: translateY(-2px);
        }

        .dropdown-menu {
            border: none;
            box-shadow: var(--card-shadow);
            border-radius: 15px;
            padding: 0.5rem;
            margin-top: 0.5rem;
        }

        .dropdown-item {
            border-radius: 10px;
            padding: 0.75rem 1rem;
            margin: 0.25rem 0;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .dropdown-item:hover {
            background: var(--primary-gradient);
            color: white;
            transform: translateX(5px);
        }

        /* Container */
        .container {
            max-width: 800px;
        }

        /* Page Header */
        .page-header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem 0;
        }

        .page-title {
            font-size: 2.5rem;
            font-weight: 700;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }

        .page-subtitle {
            color: var(--text-light);
            font-size: 1.1rem;
        }

        /* Form Container */
        .form-container {
            background: white;
            border-radius: 20px;
            box-shadow: var(--card-shadow);
            padding: 2.5rem;
            margin-bottom: 2rem;
            position: relative;
            overflow: hidden;
        }

        .form-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--primary-gradient);
        }

        /* Form Elements */
        .form-label {
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
        }

        .form-control,
        .form-select {
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            padding: 1rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #f8fafc;
        }

        .form-control:focus,
        .form-select:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
            outline: none;
            background: white;
        }

        .form-control::placeholder {
            color: var(--text-light);
            font-style: italic;
        }

        /* Textarea specific */
        .content-textarea {
            min-height: 200px;
            resize: vertical;
            line-height: 1.6;
        }

        /* Form Groups */
        .form-group {
            margin-bottom: 2rem;
        }

        /* Buttons */
        .btn-container {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }

        .save-btn {
            background: var(--success-color);
            border: none;
            border-radius: 15px;
            padding: 1rem 2rem;
            font-weight: 600;
            color: white;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            min-width: 180px;
            justify-content: center;
        }

        .save-btn:hover {
            background: #059669;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
            color: white;
        }

        .save-btn:disabled {
            opacity: 0.6;
            transform: none;
            cursor: not-allowed;
        }

        .back-btn {
            background: var(--secondary-color);
            border: none;
            border-radius: 15px;
            padding: 1rem 2rem;
            font-weight: 600;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1rem;
            min-width: 150px;
            justify-content: center;
        }

        .back-btn:hover {
            background: #475569;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(100, 116, 139, 0.3);
            color: white;
        }

        /* Loading State */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .loading-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: var(--card-shadow);
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        /* Form Validation */
        .is-invalid {
            border-color: var(--danger-color) !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }

        .invalid-feedback {
            color: var(--danger-color);
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* Success Message */
        .success-message {
            background: rgba(16, 185, 129, 0.1);
            border: 2px solid var(--success-color);
            color: var(--success-color);
            padding: 1rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            display: none;
            align-items: center;
            gap: 0.5rem;
        }

        /* Article Info Card */
        .article-info {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            border-left: 4px solid var(--primary-color);
        }

        .article-info-title {
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .article-info-meta {
            color: var(--text-light);
            font-size: 0.9rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        /* Character Counter */
        .char-counter {
            font-size: 0.9rem;
            color: var(--text-light);
            text-align: right;
            margin-top: 0.5rem;
        }

        .char-counter.warning {
            color: var(--accent-color);
        }

        .char-counter.danger {
            color: var(--danger-color);
        }

        /* Changes Indicator */
        .changes-indicator {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--accent-color);
            color: white;
            padding: 1rem;
            border-radius: 15px;
            box-shadow: var(--card-shadow);
            display: none;
            align-items: center;
            gap: 0.5rem;
            z-index: 1000;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .navbar {
                padding: 1rem;
            }

            .page-title {
                font-size: 2rem;
                flex-direction: column;
                gap: 0.5rem;
            }

            .form-container {
                padding: 1.5rem;
                margin: 1rem;
            }

            .btn-container {
                flex-direction: column;
                align-items: center;
            }

            .save-btn,
            .back-btn {
                width: 100%;
                max-width: 300px;
            }

            .article-info-meta {
                flex-direction: column;
                gap: 0.5rem;
            }

            .changes-indicator {
                bottom: 1rem;
                right: 1rem;
                left: 1rem;
                justify-content: center;
            }
        }

        /* Animations */
        .fade-in {
            animation: fadeIn 0.6s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Form Loading State */
        .form-loading {
            position: relative;
            pointer-events: none;
            opacity: 0.7;
        }

        .form-loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            border: 3px solid #f3f4f6;
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            transform: translate(-50%, -50%);
        }
    </style>
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
                <i class="fas fa-edit"></i>
                Chỉnh sửa bài viết
            </h1>
            <p class="page-subtitle">Cập nhật nội dung và thông tin bài viết của bạn</p>
        </div>

        <!-- Article Info -->
        <div class="article-info fade-in" id="articleInfo" style="display: none;">
            <div class="article-info-title">
                <i class="fas fa-info-circle"></i>
                Thông tin bài viết
            </div>
            <div class="article-info-meta" id="articleMeta">
                <!-- Will be populated by JavaScript -->
            </div>
        </div>

        <div class="success-message" id="successMessage">
            <i class="fas fa-check-circle"></i>
            <span>Bài viết đã được cập nhật thành công!</span>
        </div>

        <div class="form-container fade-in" id="formContainer">
            <form id="editForm">
                <div class="form-group">
                    <label class="form-label" for="title">
                        <i class="fas fa-heading text-primary"></i>
                        Tiêu đề bài viết
                    </label>
                    <input type="text" class="form-control" id="title"
                        placeholder="Nhập tiêu đề hấp dẫn cho bài viết của bạn..." maxlength="200" required>
                    <div class="char-counter" id="titleCounter">0/200 ký tự</div>
                    <div class="invalid-feedback" id="titleError"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="content">
                        <i class="fas fa-align-left text-primary"></i>
                        Nội dung bài viết
                    </label>
                    <textarea class="form-control content-textarea" id="content"
                        placeholder="Viết nội dung bài viết của bạn tại đây..." maxlength="5000" required></textarea>
                    <div class="char-counter" id="contentCounter">0/5000 ký tự</div>
                    <div class="invalid-feedback" id="contentError"></div>
                </div>

                <div class="form-group">
                    <label class="form-label" for="categoryId">
                        <i class="fas fa-tags text-primary"></i>
                        Thể loại
                    </label>
                    <select class="form-select" id="categoryId" required>
                        <option value="">-- Chọn thể loại phù hợp --</option>
                        <!-- JS sẽ render thêm -->
                    </select>
                    <div class="invalid-feedback" id="categoryError"></div>
                </div>

                <div class="btn-container">
                    <button type="submit" class="save-btn" id="saveBtn">
                        <i class="fas fa-save"></i>
                        <span>Lưu thay đổi</span>
                    </button>
                    <a href="?controller=article&action=myArticles" class="back-btn">
                        <i class="fas fa-arrow-left"></i>
                        <span>Quay lại</span>
                    </a>
                </div>
            </form>
        </div>
    </div>

    <!-- Changes Indicator -->
    <div class="changes-indicator" id="changesIndicator">
        <i class="fas fa-exclamation-circle"></i>
        <span>Bạn có thay đổi chưa lưu</span>
    </div>

    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-content">
            <div class="spinner"></div>
            <p>Đang cập nhật bài viết...</p>
        </div>
    </div>

    <script>
        let user;
        let originalData = {};
        let hasChanges = false;

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

        const articleId = new URLSearchParams(window.location.search).get('id');

        // Fetch article data
        const fetchArticle = async () => {
            try {
                document.getElementById('formContainer').classList.add('form-loading');

                const res = await fetch(`http://localhost:3000/api/articles/${articleId}`, {
                    headers: { Authorization: 'Bearer ' + token }
                });
                const { article } = await res.json();
                const articleData = article[0];

                // Store original data
                originalData = {
                    title: articleData.title,
                    content: articleData.content,
                    categoryId: articleData.categoryId
                };

                // Populate form
                document.getElementById('title').value = articleData.title;
                document.getElementById('content').value = articleData.content;

                // Update character counters
                updateCharacterCounters();

                // Show article info
                showArticleInfo(articleData);

                // Load categories with selected value
                await loadCategories(articleData.categoryId);

            } catch (err) {
                console.error('Lỗi khi tải bài viết:', err);
                alert('Có lỗi xảy ra khi tải bài viết!');
            } finally {
                document.getElementById('formContainer').classList.remove('form-loading');
            }
        };

        // Show article information
        const showArticleInfo = (article) => {
            const articleInfo = document.getElementById('articleInfo');
            const articleMeta = document.getElementById('articleMeta');

            articleMeta.innerHTML = `
                <div class="meta-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Ngày tạo: ${new Date(article.publishDate).toLocaleDateString('vi-VN')}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-user"></i>
                    <span>Tác giả: ${article.authorName}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-tag"></i>
                    <span>Thể loại: ${article.categoryName}</span>
                </div>
            `;

            articleInfo.style.display = 'block';
        };

        // Load categories
        const loadCategories = async (selectedId) => {
            try {
                const res = await fetch('http://localhost:3000/api/categories');
                const { categories } = await res.json();
                const select = document.getElementById('categoryId');

                // Clear existing options except the first one
                select.innerHTML = '<option value="">-- Chọn thể loại phù hợp --</option>';

                categories.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = c.name;
                    if (c.id === selectedId) opt.selected = true;
                    select.appendChild(opt);
                });
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err);
            }
        };

        // Character counters
        const updateCharacterCounters = () => {
            const titleInput = document.getElementById('title');
            const contentInput = document.getElementById('content');
            const titleCounter = document.getElementById('titleCounter');
            const contentCounter = document.getElementById('contentCounter');

            const titleLength = titleInput.value.length;
            const contentLength = contentInput.value.length;
            const titleMaxLength = 200;
            const contentMaxLength = 5000;

            titleCounter.textContent = `${titleLength}/${titleMaxLength} ký tự`;
            contentCounter.textContent = `${contentLength}/${contentMaxLength} ký tự`;

            // Update counter colors
            if (titleLength > titleMaxLength * 0.9) {
                titleCounter.className = 'char-counter danger';
            } else if (titleLength > titleMaxLength * 0.7) {
                titleCounter.className = 'char-counter warning';
            } else {
                titleCounter.className = 'char-counter';
            }

            if (contentLength > contentMaxLength * 0.9) {
                contentCounter.className = 'char-counter danger';
            } else if (contentLength > contentMaxLength * 0.7) {
                contentCounter.className = 'char-counter warning';
            } else {
                contentCounter.className = 'char-counter';
            }
        };

        // Check for changes
        const checkForChanges = () => {
            const currentData = {
                title: document.getElementById('title').value,
                content: document.getElementById('content').value,
                categoryId: document.getElementById('categoryId').value
            };

            hasChanges = JSON.stringify(originalData) !== JSON.stringify(currentData);

            const indicator = document.getElementById('changesIndicator');
            indicator.style.display = hasChanges ? 'flex' : 'none';
        };

        // Setup event listeners
        const setupEventListeners = () => {
            const titleInput = document.getElementById('title');
            const contentInput = document.getElementById('content');
            const categorySelect = document.getElementById('categoryId');

            [titleInput, contentInput].forEach(input => {
                input.addEventListener('input', () => {
                    updateCharacterCounters();
                    checkForChanges();
                });
            });

            categorySelect.addEventListener('change', checkForChanges);
        };

        // Form validation
        const validateForm = () => {
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');

            // Validate title
            const title = document.getElementById('title').value.trim();
            if (!title) {
                document.getElementById('title').classList.add('is-invalid');
                document.getElementById('titleError').innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng nhập tiêu đề';
                isValid = false;
            } else if (title.length < 10) {
                document.getElementById('title').classList.add('is-invalid');
                document.getElementById('titleError').innerHTML = '<i class="fas fa-exclamation-circle"></i> Tiêu đề phải có ít nhất 10 ký tự';
                isValid = false;
            }

            // Validate content
            const content = document.getElementById('content').value.trim();
            if (!content) {
                document.getElementById('content').classList.add('is-invalid');
                document.getElementById('contentError').innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng nhập nội dung';
                isValid = false;
            } else if (content.length < 50) {
                document.getElementById('content').classList.add('is-invalid');
                document.getElementById('contentError').innerHTML = '<i class="fas fa-exclamation-circle"></i> Nội dung phải có ít nhất 50 ký tự';
                isValid = false;
            }

            // Validate category
            const categoryId = document.getElementById('categoryId').value;
            if (!categoryId) {
                document.getElementById('categoryId').classList.add('is-invalid');
                document.getElementById('categoryError').innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng chọn thể loại';
                isValid = false;
            }

            return isValid;
        };

        // Form submission
        document.getElementById('editForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            const saveBtn = document.getElementById('saveBtn');
            const loadingOverlay = document.getElementById('loadingOverlay');

            // Show loading
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Đang lưu...</span>';
            loadingOverlay.style.display = 'flex';

            try {
                const updatedArticle = {
                    title: document.getElementById('title').value.trim(),
                    content: document.getElementById('content').value.trim(),
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
                    // Show success message
                    document.getElementById('successMessage').style.display = 'flex';

                    // Update original data
                    originalData = { ...updatedArticle };
                    hasChanges = false;
                    document.getElementById('changesIndicator').style.display = 'none';

                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = '?controller=article&action=myArticles';
                    }, 1500);
                } else {
                    throw new Error('Không thể cập nhật bài viết');
                }
            } catch (err) {
                console.error('Lỗi khi cập nhật bài viết:', err);
                alert('Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại!');
            } finally {
                // Hide loading
                loadingOverlay.style.display = 'none';
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-save"></i> <span>Lưu thay đổi</span>';
            }
        });

        // Warn before leaving if there are unsaved changes
        window.addEventListener('beforeunload', (e) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        });

        // Initialize
        fetchArticle().then(() => {
            setupEventListeners();
        });
    </script>
</body>

</html>