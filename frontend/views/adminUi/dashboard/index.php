<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="/article_management/frontend/views/adminUi/css/dashboard/index.css">
</head>

<body>
    <div class="dashboard-container">
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>Admin Panel</h2>
                <p>Hệ thống quản trị</p>
                <button onclick="signout()" style="margin: auto; margin-top: 5px;" class="btn btn-secondary">Đăng
                    xuất</button>
            </div>
            <nav class="nav-menu">
                <button class="nav-item active" onclick="changePage('articles')" id="nav-articles">
                    <span class="nav-icon">📄</span>
                    Quản lí bài báo
                </button>
                <button class="nav-item" onclick="changePage('users')" id="nav-users">
                    <span class="nav-icon">👤</span>
                    Quản lí user
                </button>
                <button class="nav-item" onclick="changePage('categories')" id="nav-categories">
                    <span class="nav-icon">📂</span>
                    Quản lí thể loại
                </button>
            </nav>
        </div>

        <!-- Main Content Area -->
        <div class="main-content">
            <div class="content-header">
                <h1 id="page-title">Quản lí bài báo</h1>
                <div class="breadcrumb">
                    <span>Dashboard</span> / <span id="breadcrumb-current">Bài báo</span>
                </div>
            </div>
            <div class="content-body">
                <div class="content-card" id="container">
                    <!-- Content will be loaded here -->
                </div>
            </div>
        </div>
    </div>

    <script>
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
            window.location.href = '?mode=admin&controller=auth&action=signin';
        }

        let page = 'articles';
        let articlesData = [];
        let usersData = [];
        let categoriesData = [];
        let currentEditingArticle = null;
        let currentEditingUser = null;
        const container = document.getElementById('container');
        const pageTitle = document.getElementById('page-title');
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');

        const createAddArticleForm = () => {
            const categoryOptions = categoriesData.map(cat =>
                `<option value="${cat.id}">${cat.name}</option>`
            ).join('');

            return `
                <div class="form-container">
                    <div class="form-header">
                        <h3>➕ Thêm bài báo mới</h3>
                        <button class="back-button" onclick="changePage('articles')">
                            ← Quay lại danh sách
                        </button>
                    </div>
                    
                    <form class="article-form" id="addArticleForm">
                        <div class="form-row">
                            <div class="form-group" data-field="title">
                                <label for="title">Tiêu đề *</label>
                                <input type="text" id="title" name="title" placeholder="Tiêu đề bài báo" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group" data-field="categoryId">
                                <label for="categoryId">Thể loại *</label>
                                <select id="categoryId" name="categoryId" required>
                                    <option value="">Chọn thể loại</option>
                                    ${categoryOptions}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group full-height" data-field="content">
                            <label for="content">Nội dung *</label>
                            <textarea id="content" name="content" placeholder="Nhập nội dung bài báo..." required></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="changePage('articles')">
                                ✖️ Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                ✅ Thêm bài báo
                            </button>
                        </div>
                    </form>
                </div>
            `;
        };

        const createEditArticleForm = (article) => {
            const categoryOptions = categoriesData.map(cat =>
                `<option value="${cat.id}" ${cat.id == article.categoryId ? 'selected' : ''}>${cat.name}</option>`
            ).join('');

            return `
                <div class="form-container">
                    <div class="form-header">
                        <h3>✏️ Chỉnh sửa bài báo</h3>
                        <button class="back-button" onclick="changePage('articles')">
                            ← Quay lại danh sách
                        </button>
                    </div>
                    
                    <form class="article-form" id="editArticleForm">
                        <div class="form-row">
                            <div class="form-group" data-field="title">
                                <label for="title">Tiêu đề *</label>
                                <input type="text" id="title" name="title" value="${article?.title || ''}" required>
                            </div>                            
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group" data-field="categoryId">
                                <label for="categoryId">Thể loại *</label>
                                <select id="categoryId" name="categoryId" required>
                                    <option value="">Chọn thể loại</option>
                                    ${categoryOptions}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group full-height" data-field="content">
                            <label for="content">Nội dung *</label>
                            <textarea id="content" name="content" placeholder="Nhập nội dung bài báo..." required>${article.content || ''}</textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="changePage('articles')">
                                ✖️ Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                💾 Cập nhật bài báo
                            </button>
                        </div>
                    </form>
                </div>
            `;
        };

        const createArticlesTable = (articles) => {
            if (!articles || articles.length === 0) {
                return `
                    <div class="table-header">
                        <h3>📄 Danh sách bài báo</h3>
                        <button class="add-button" onclick="addArticle()">+ Thêm bài báo</button>
                    </div>
                    <div style="text-align: center; padding: 40px; color: #666;">
                        Không có bài báo nào để hiển thị
                    </div>
                `;
            }

            const tableRows = articles.map((article, index) => `
                <tr>
                    <td><strong>${article.title || 'Không có tiêu đề'}</strong></td>
                    <td class="content-preview">${(article.content || 'Không có nội dung')}</td>
                    <td class="date-cell">${new Date(article?.publishDate).toLocaleDateString()}</td>
                    <td class="author-cell">${article.authorName || 'Không rõ tác giả'}</td>
                    <td><span class="category-cell">${article.categoryName || 'Chưa phân loại'}</span></td>
                    <td class="actions-cell">
                        <button class="action-btn edit-btn" onclick="editArticle(${article.id})">
                            ✏️ Sửa
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteArticle(${article.id})">
                            🗑️ Xóa
                        </button>
                    </td>
                </tr>
            `).join('');

            return `
                <div class="table-header">
                    <h3>📄 Danh sách bài báo (${articles.length})</h3>
                    <button class="add-button" onclick="addArticle()">+ Thêm bài báo</button>
                </div>
                <div class="table-container">
                    <table class="articles-table">
                        <thead>
                            <tr>
                                <th>Tiêu đề</th>
                                <th>Nội dung</th>
                                <th>Ngày xuất bản</th>
                                <th>Tác giả</th>
                                <th>Thể loại</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;
        };

        const changePage = async (namePage, articleId = null) => {
            page = namePage;

            // Remove active class from all nav items
            if (page == 'articles' || page == 'categories' || page == 'users') {
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
            }

            // Add active class to current nav item    
            if (page == 'articles' || page == 'categories' || page == 'users') {
                document.getElementById(`nav-${namePage}`).classList.add('active');
            }

            // Add fade animation
            container.classList.remove('fade-in');
            setTimeout(() => {
                container.classList.add('fade-in');
            }, 10);

            if (page === 'articles') {
                pageTitle.textContent = 'Quản lí bài báo';
                breadcrumbCurrent.textContent = 'Bài báo';
                container.innerHTML = '<div class="loading">Đang tải dữ liệu...</div>';
                await fetchArticles();
                container.innerHTML = createArticlesTable(articlesData);
            } else if (page === 'users') {
                pageTitle.textContent = 'Quản lí người dùng';
                breadcrumbCurrent.textContent = 'Người dùng';
                await fetchUsers();
                container.innerHTML = createUsersTable(usersData);
            } else if (page === 'categories') {
                pageTitle.textContent = 'Quản lí thể loại';
                breadcrumbCurrent.textContent = 'Thể loại';
                container.innerHTML = `
                    <h3>📂 Danh sách thể loại</h3>
                    <p>Hiển thị thể loại ở đây...</p>
                    <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <strong>Tính năng:</strong> Tạo và quản lý các danh mục, thể loại cho bài báo.
                    </div>
                `;
            } else if (page == 'addArticle') {
                pageTitle.textContent = 'Thêm bài báo';
                breadcrumbCurrent.textContent = 'Thêm bài báo';
                await fetchCategories();
                container.innerHTML = createAddArticleForm();

                // xu li them article
                document.getElementById('addArticleForm').addEventListener('submit', async e => {
                    e.preventDefault();
                    const res = await fetch(`http://localhost:3000/api/articles`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            "content": document.getElementById('content').value,
                            "title": document.getElementById('title').value,
                            "userId": 4, // cố định là admin
                            "categoryId": document.getElementById('categoryId').value
                        })
                    });
                    if (!res.ok) {
                        alert('Có lỗi xảy ra khi thêm.')
                    } else {
                        changePage('articles');
                    }
                })
            } else if (page == 'editArticle') {
                pageTitle.textContent = 'Bài báo';
                breadcrumbCurrent.textContent = 'Sửa bài báo';
                await fetchCategories();
                container.innerHTML = createEditArticleForm(currentEditingArticle);
                // xu li sua article
                document.getElementById('editArticleForm').addEventListener('submit', async e => {
                    e.preventDefault();
                    const res = await fetch(`http://localhost:3000/api/articles/${currentEditingArticle.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            "content": document.getElementById('content').value,
                            "title": document.getElementById('title').value,
                            "categoryId": document.getElementById('categoryId').value
                        })
                    });
                    if (!res.ok) {
                        alert('Có lỗi xảy ra khi sửa.')
                    } else {
                        changePage('articles');
                    }
                })
            } else if (page == 'editUser') {
                pageTitle.textContent = 'Quản lí người dùng';
                breadcrumbCurrent.textContent = 'Sửa người dùng';
                container.innerHTML = createEditUserForm(currentEditingUser);
                document.getElementById('editUserForm').addEventListener('submit', async e => {
                    e.preventDefault();
                    const res = await fetch(`http://localhost:3000/api/users/${currentEditingUser.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            "name": document.getElementById('name').value,
                            "email": document.getElementById('email').value,
                            "password": document.getElementById('password').value
                        })
                    });
                    if (!res.ok) {
                        alert('Có lỗi xảy ra khi sửa.')
                    } else {
                        changePage('users');
                    }
                })
            } else if (page == 'addUser') {
                pageTitle.textContent = 'Quản lí người dùng';
                breadcrumbCurrent.textContent = 'Thêm người dùng';
                container.innerHTML = createAddUserForm();
                document.getElementById('addUserForm').addEventListener('submit', async e => {
                    e.preventDefault();
                    const res = await fetch(`http://localhost:3000/api/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            "name": document.getElementById('name').value,
                            "email": document.getElementById('email').value,
                            "password": document.getElementById('password').value
                        })
                    });
                    if (!res.ok) {
                        alert('Có lỗi xảy ra khi thêm.')
                    } else {
                        changePage('users');
                    }
                })
            }
        };

        const fetchArticles = async () => {
            const res = await fetch('http://localhost:3000/api/articles');
            const data = await res.json();
            articlesData = data.articles || [];
        };

        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/categories');
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                categoriesData = data.categories || [];
            } catch (error) {
                console.error('Error fetching categories:', error);
                throw error;
            }
        };

        const addArticle = () => {
            changePage('addArticle');
        }

        const editArticle = async (articleId) => {
            const res = await fetch(`http://localhost:3000/api/articles/${articleId}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            currentEditingArticle = data.article[0];
            changePage('editArticle');
        };

        const deleteArticle = async (articleId) => {
            if (confirm('Bạn có chắc muốn xóa bài báo này?')) {
                await fetch(`http://localhost:3000/api/articles/${articleId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                changePage('articles')
            }
        };

        const fetchUsers = async () => {
            const res = await fetch('http://localhost:3000/api/users');
            const data = await res.json();
            usersData = data.users || [];
        }

        const createUsersTable = users => {
            if (!users || users.length === 0) {
                return `
                    <div class="table-header">
                        <h3>📄 Danh sách người dùng</h3>
                        <button class="add-button" onclick="addUser()">+ Thêm người dùng</button>
                    </div>
                    <div style="text-align: center; padding: 40px; color: #666;">
                        Không có người dùng nào để hiển thị
                    </div>
                `;
            }

            const tableRows = users.map((user, index) => `
                <tr>
                    <td><strong>${user?.name}</strong></td>
                    <td class="content-preview">${user?.email}</td>
                    <td class="date-cell">${user?.password}</td>
                
                    <td class="actions-cell">
                        <button class="action-btn edit-btn" onclick="editUser(${user.id})">
                            ✏️ Sửa
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">
                            🗑️ Xóa
                        </button>
                    </td>
                </tr>
            `).join('');

            return `
                <div class="table-header">
                    <h3>📄 Danh sách người dùng (${users.length})</h3>
                    <button class="add-button" onclick="addUser()">+ Thêm user</button>
                </div>
                <div class="table-container">
                    <table class="articles-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Mật khẩu</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            `;
        };

        const addUser = () => {
            changePage('addUser');
        }

        const createAddUserForm = () => {
            return `
                <div class="form-container">
                    <div class="form-header">
                        <h3>✏️ Thêm người dùng</h3>
                        <button class="back-button" onclick="changePage('users')">
                            ← Quay lại danh sách
                        </button>
                    </div>      
                    <form id='addUserForm'>
                        <div class="form-row">
                            <div class="form-group" data-field="name">
                                <label>Tên người dùng *</label>
                                <input id="name" name="name" required>
                            </div>                            
                        </div>
                        <div class="form-row">
                            <div class="form-group" data-field="email">
                                <label>Email của người dùng *</label>
                                <input id="email" name="email" required>
                            </div>                            
                        </div>
                        <div class="form-row">
                            <div class="form-group" data-field="password">
                                <label>Mật khẩu của người dùng *</label>
                                <input id="password" name="password" required>
                            </div>                            
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="changePage('users')">
                                ✖️ Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                💾 Thêm người dùng
                            </button>
                        </div>
                    </form>                              
                </div>
            `;
        };

        const editUser = async userId => {
            const res = await fetch(`http://localhost:3000/api/users/${userId}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            currentEditingUser = data?.user[0];

            changePage('editUser')
        }

        const createEditUserForm = (user) => {
            return `
                <div class="form-container">
                    <div class="form-header">
                        <h3>✏️ Chỉnh sửa người dùng</h3>
                        <button class="back-button" onclick="changePage('users')">
                            ← Quay lại danh sách
                        </button>
                    </div>      
                    <form id='editUserForm'>
                        <div class="form-row">
                            <div class="form-group" data-field="name">
                                <label>Tên người dùng *</label>
                                <input id="name" name="name" value="${user?.name || ''}" required>
                            </div>                            
                        </div>
                        <div class="form-row">
                            <div class="form-group" data-field="email">
                                <label>Email của người dùng *</label>
                                <input id="email" name="email" value="${user?.email || ''}" required>
                            </div>                            
                        </div>
                        <div class="form-row">
                            <div class="form-group" data-field="password">
                                <label>Mật khẩu của người dùng *</label>
                                <input id="password" name="password" value="${user?.password || ''}" required>
                            </div>                            
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="changePage('users')">
                                ✖️ Hủy
                            </button>
                            <button type="submit" class="btn btn-primary">
                                💾 Cập nhật người dùng
                            </button>
                        </div>
                    </form>                              
                </div>
            `;
        };

        const deleteUser = async userId => {
            if (confirm('Bạn có chắc muốn xóa user này?')) {
                await fetch(`http://localhost:3000/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                changePage('users')
            }
        };
        // Gọi lần đầu để hiển thị trang mặc định
        changePage(page);

        const signout = () => {
            localStorage.removeItem('token');
            window.location.reload();
        }
    </script>
</body>

</html>