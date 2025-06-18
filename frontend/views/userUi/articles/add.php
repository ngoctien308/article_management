<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Tạo bài viết</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/article_management/frontend/views/userUi/css/add.css">
</head>

<body>
    <!-- Enhanced Header - Same as other pages -->
    <nav class="navbar navbar-expand-lg">
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

    <div class="container py-5">
        <div class="page-header">
            <h1 class="page-title">
                <i class="fas fa-pen-fancy"></i>
                Tạo bài viết mới
            </h1>
            <p class="page-subtitle">Chia sẻ những suy nghĩ và ý tưởng của bạn với cộng đồng</p>
        </div>

        <div class="success-message" id="successMessage">
            <i class="fas fa-check-circle"></i>
            <span>Bài viết đã được tạo thành công!</span>
        </div>

        <div class="form-container fade-in">
            <form id="addForm">
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
                        placeholder="Viết nội dung bài viết của bạn tại đây. Hãy chia sẻ những suy nghĩ, kinh nghiệm hoặc thông tin hữu ích..."
                        maxlength="5000" required></textarea>
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
                        <span>Xuất bản bài viết</span>
                    </button>
                    <a href="?controller=article&action=myArticles" class="back-btn">
                        <i class="fas fa-arrow-left"></i>
                        <span>Quay lại</span>
                    </a>
                </div>
            </form>
        </div>
    </div>

    <!-- Loading Overlay -->
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-content">
            <div class="spinner"></div>
            <p>Đang lưu bài viết...</p>
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

        // Load categories
        const loadCategories = async (selectedId) => {
            try {
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
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err);
            }
        };
        loadCategories(0);

        // Character counters
        const setupCharacterCounters = () => {
            const titleInput = document.getElementById('title');
            const contentInput = document.getElementById('content');
            const titleCounter = document.getElementById('titleCounter');
            const contentCounter = document.getElementById('contentCounter');

            titleInput.addEventListener('input', () => {
                const length = titleInput.value.length;
                const maxLength = 200;
                titleCounter.textContent = `${length}/${maxLength} ký tự`;

                if (length > maxLength * 0.9) {
                    titleCounter.className = 'char-counter danger';
                } else if (length > maxLength * 0.7) {
                    titleCounter.className = 'char-counter warning';
                } else {
                    titleCounter.className = 'char-counter';
                }
            });

            contentInput.addEventListener('input', () => {
                const length = contentInput.value.length;
                const maxLength = 5000;
                contentCounter.textContent = `${length}/${maxLength} ký tự`;

                if (length > maxLength * 0.9) {
                    contentCounter.className = 'char-counter danger';
                } else if (length > maxLength * 0.7) {
                    contentCounter.className = 'char-counter warning';
                } else {
                    contentCounter.className = 'char-counter';
                }
            });
        };
        setupCharacterCounters();

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
        document.getElementById('addForm').addEventListener('submit', async (e) => {
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
                const newArticle = {
                    title: document.getElementById('title').value.trim(),
                    content: document.getElementById('content').value.trim(),
                    categoryId: document.getElementById('categoryId').value,
                    userId: user?.id
                };

                const res = await fetch(`http://localhost:3000/api/articles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify(newArticle)
                });

                const result = await res.json();

                if (result?.status) {
                    // Show success message
                    document.getElementById('successMessage').style.display = 'flex';

                    // Redirect after a short delay
                    setTimeout(() => {
                        window.location.href = '?controller=article&action=index';
                    }, 1500);
                } else {
                    throw new Error('Không thể tạo bài viết');
                }
            } catch (err) {
                console.error('Lỗi khi tạo bài viết:', err);
                alert('Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại!');
            } finally {
                // Hide loading
                loadingOverlay.style.display = 'none';
                saveBtn.disabled = false;
                saveBtn.innerHTML = '<i class="fas fa-save"></i> <span>Xuất bản bài viết</span>';
            }
        });

        // Auto-save draft (optional enhancement)
        let autoSaveTimeout;
        const autoSaveDraft = () => {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                const title = document.getElementById('title').value.trim();
                const content = document.getElementById('content').value.trim();
                const categoryId = document.getElementById('categoryId').value;

                if (title || content) {
                    localStorage.setItem('articleDraft', JSON.stringify({
                        title, content, categoryId, timestamp: Date.now()
                    }));
                }
            }, 2000);
        };

        // Load draft on page load
        const loadDraft = () => {
            const draft = localStorage.getItem('articleDraft');
            if (draft) {
                const { title, content, categoryId, timestamp } = JSON.parse(draft);
                const hoursSinceLastSave = (Date.now() - timestamp) / (1000 * 60 * 60);

                if (hoursSinceLastSave < 24) { // Only load if less than 24 hours old
                    if (confirm('Bạn có muốn khôi phục bản nháp đã lưu không?')) {
                        document.getElementById('title').value = title || '';
                        document.getElementById('content').value = content || '';
                        document.getElementById('categoryId').value = categoryId || '';

                        // Update character counters
                        document.getElementById('title').dispatchEvent(new Event('input'));
                        document.getElementById('content').dispatchEvent(new Event('input'));
                    }
                }
            }
        };

        // Set up auto-save
        document.getElementById('title').addEventListener('input', autoSaveDraft);
        document.getElementById('content').addEventListener('input', autoSaveDraft);
        document.getElementById('categoryId').addEventListener('change', autoSaveDraft);

        // Load draft when page loads
        setTimeout(loadDraft, 1000);

        // Clear draft on successful submission
        window.addEventListener('beforeunload', () => {
            // Only clear if form is being submitted successfully
            if (document.getElementById('successMessage').style.display === 'flex') {
                localStorage.removeItem('articleDraft');
            }
        });
    </script>
</body>

</html>