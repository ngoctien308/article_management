<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            line-height: 1.6;
        }

        .dashboard {
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar Styles */
        .sidebar {
            width: 280px;
            background: #ffffff;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            position: fixed;
            height: 100vh;
            left: 0;
            top: 0;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        .sidebar.collapsed {
            transform: translateX(-100%);
        }

        .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo i {
            width: 2rem;
            height: 2rem;
            background: #3b82f6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            font-size: 1rem;
        }

        .logo-text h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1e293b;
        }

        .logo-text span {
            font-size: 0.75rem;
            color: #64748b;
        }

        .sidebar-nav {
            flex: 1;
            padding: 1rem 0;
        }

        .nav-list {
            list-style: none;
        }

        .nav-item {
            margin: 0.25rem 0;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1.5rem;
            color: #64748b;
            text-decoration: none;
            transition: all 0.2s ease;
            border-radius: 0;
        }

        .nav-link:hover {
            background: #f1f5f9;
            color: #3b82f6;
        }

        .nav-item.active .nav-link {
            background: #eff6ff;
            color: #3b82f6;
            border-right: 3px solid #3b82f6;
        }

        .nav-link i {
            width: 1.25rem;
            text-align: center;
        }

        .sidebar-footer {
            padding: 1rem;
            border-top: 1px solid #e2e8f0;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .user-profile:hover {
            background: #f1f5f9;
        }

        .user-avatar {
            width: 2rem;
            height: 2rem;
            background: #e2e8f0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
        }

        .user-info {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1e293b;
        }

        .user-email {
            font-size: 0.75rem;
            color: #64748b;
        }

        /* Main Content Styles */
        .main-content {
            flex: 1;
            margin-left: 280px;
            display: flex;
            flex-direction: column;
            transition: margin-left 0.3s ease;
        }

        .main-content.expanded {
            margin-left: 0;
        }

        .header {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .sidebar-toggle {
            background: none;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            color: #64748b;
            border-radius: 0.375rem;
            transition: background 0.2s ease;
        }

        .sidebar-toggle:hover {
            background: #f1f5f9;
        }

        .search-box {
            position: relative;
            max-width: 400px;
            width: 100%;
        }

        .search-box i {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #64748b;
        }

        .search-box input {
            width: 100%;
            padding: 0.5rem 0.75rem 0.5rem 2.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            outline: none;
            transition: border-color 0.2s ease;
        }

        .search-box input:focus {
            border-color: #3b82f6;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .notification-btn {
            position: relative;
            background: none;
            border: none;
            padding: 0.5rem;
            cursor: pointer;
            color: #64748b;
            border-radius: 0.375rem;
            transition: background 0.2s ease;
        }

        .notification-btn:hover {
            background: #f1f5f9;
        }

        .notification-badge {
            position: absolute;
            top: 0.25rem;
            right: 0.25rem;
            background: #ef4444;
            color: white;
            font-size: 0.625rem;
            padding: 0.125rem 0.25rem;
            border-radius: 0.5rem;
            min-width: 1rem;
            text-align: center;
        }

        .content {
            flex: 1;
            padding: 1.5rem;
        }

        .page-header {
            margin-bottom: 2rem;
        }

        .page-header h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
        }

        .page-header p {
            color: #64748b;
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 1rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
            width: 3rem;
            height: 3rem;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.25rem;
        }

        .stat-icon.users {
            background: #3b82f6;
        }

        .stat-icon.articles {
            background: #10b981;
        }

        .stat-icon.categories {
            background: #f59e0b;
        }

        .stat-icon.views {
            background: #8b5cf6;
        }

        .stat-content h3 {
            font-size: 1.875rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.25rem;
        }

        .stat-content p {
            color: #64748b;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }

        .stat-change {
            font-size: 0.75rem;
            font-weight: 500;
        }

        .stat-change.positive {
            color: #10b981;
        }

        /* Activity Grid */
        .activity-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .activity-card {
            background: white;
            border-radius: 0.75rem;
            border: 1px solid #e2e8f0;
            overflow: hidden;
        }

        .card-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 0.25rem;
        }

        .card-header p {
            color: #64748b;
            font-size: 0.875rem;
        }

        .card-content {
            padding: 1.5rem;
        }

        /* User List */
        .user-list,
        .article-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .user-item,
        .article-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
            border-radius: 0.5rem;
            transition: background 0.2s ease;
        }

        .user-item:hover,
        .article-item:hover {
            background: #f8fafc;
        }

        .user-details,
        .article-details {
            display: flex;
            flex-direction: column;
            flex: 1;
        }

        .user-name,
        .article-title {
            font-weight: 500;
            color: #1e293b;
            margin-bottom: 0.25rem;
        }

        .user-email,
        .article-author {
            font-size: 0.75rem;
            color: #64748b;
        }

        .status {
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .status.active {
            background: #dcfce7;
            color: #166534;
        }

        .status.inactive {
            background: #f1f5f9;
            color: #475569;
        }

        .status.published {
            background: #dcfce7;
            color: #166534;
        }

        .status.draft {
            background: #fef3c7;
            color: #92400e;
        }

        .status.review {
            background: #e0e7ff;
            color: #3730a3;
        }

        /* Quick Actions */
        .quick-actions {
            background: white;
            border-radius: 0.75rem;
            border: 1px solid #e2e8f0;
            overflow: hidden;
        }

        .actions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            padding: 1.5rem;
        }

        .action-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            background: white;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            color: inherit;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn.primary {
            background: #3b82f6;
            color: white;
            border-color: #3b82f6;
        }

        .action-btn.secondary:hover {
            border-color: #3b82f6;
            color: #3b82f6;
        }

        .action-btn i {
            font-size: 1.5rem;
        }

        .action-btn span {
            font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
            }

            .sidebar.open {
                transform: translateX(0);
            }

            .main-content {
                margin-left: 0;
            }

            .stats-grid {
                grid-template-columns: 1fr;
            }

            .activity-grid {
                grid-template-columns: 1fr;
            }

            .actions-grid {
                grid-template-columns: 1fr;
            }

            .header-left {
                flex: 1;
            }

            .search-box {
                max-width: none;
            }
        }

        @media (max-width: 480px) {
            .content {
                padding: 1rem;
            }

            .header {
                padding: 1rem;
            }

            .page-header h1 {
                font-size: 1.5rem;
            }

            .stat-card {
                padding: 1rem;
            }

            .card-content {
                padding: 1rem;
            }
        }
    </style>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>

<body>
    <div class="dashboard">
        <!-- Sidebar -->
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <i class="fas fa-chart-bar"></i>
                    <div class="logo-text">
                        <h3>Admin Dashboard</h3>
                        <span>Quản lý hệ thống</span>
                    </div>
                </div>
            </div>

            <nav class="sidebar-nav">
                <ul class="nav-list">
                    <li class="nav-item active">
                        <a href="#dashboard" class="nav-link">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#users" class="nav-link">
                            <i class="fas fa-users"></i>
                            <span>Quản lý Users</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#articles" class="nav-link">
                            <i class="fas fa-file-alt"></i>
                            <span>Quản lý Articles</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#categories" class="nav-link">
                            <i class="fas fa-folder-open"></i>
                            <span>Quản lý Categories</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#settings" class="nav-link">
                            <i class="fas fa-cog"></i>
                            <span>Cài đặt</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-info">
                        <span class="user-name">Admin User</span>
                        <span class="user-email">admin@example.com</span>
                    </div>
                    <div class="user-dropdown">
                        <i class="fas fa-chevron-up"></i>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Header -->
            <header class="header">
                <div class="header-left">
                    <button class="sidebar-toggle" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm...">
                    </div>
                </div>
                <div class="header-right">
                    <button class="notification-btn">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </button>
                    <div class="user-menu">
                        <div class="user-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Dashboard Content -->
            <div class="content">
                <div class="page-header">
                    <h1>Dashboard</h1>
                    <p>Tổng quan hệ thống quản lý</p>
                </div>

                <!-- Stats Cards -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon users">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2,847</h3>
                            <p>Tổng Users</p>
                            <span class="stat-change positive">+12%</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon articles">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1,234</h3>
                            <p>Tổng Articles</p>
                            <span class="stat-change positive">+8%</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon categories">
                            <i class="fas fa-folder-open"></i>
                        </div>
                        <div class="stat-content">
                            <h3>45</h3>
                            <p>Tổng Categories</p>
                            <span class="stat-change positive">+3%</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon views">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12,847</h3>
                            <p>Lượt xem hôm nay</p>
                            <span class="stat-change positive">+23%</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="activity-grid">
                    <!-- Recent Users -->
                    <div class="activity-card">
                        <div class="card-header">
                            <h3>Users mới nhất</h3>
                            <p>Danh sách người dùng đăng ký gần đây</p>
                        </div>
                        <div class="card-content">
                            <div class="user-list">
                                <div class="user-item">
                                    <div class="user-avatar">NA</div>
                                    <div class="user-details">
                                        <span class="user-name">Nguyễn Văn A</span>
                                        <span class="user-email">nguyenvana@email.com</span>
                                    </div>
                                    <span class="status active">Hoạt động</span>
                                </div>
                                <div class="user-item">
                                    <div class="user-avatar">TB</div>
                                    <div class="user-details">
                                        <span class="user-name">Trần Thị B</span>
                                        <span class="user-email">tranthib@email.com</span>
                                    </div>
                                    <span class="status active">Hoạt động</span>
                                </div>
                                <div class="user-item">
                                    <div class="user-avatar">LC</div>
                                    <div class="user-details">
                                        <span class="user-name">Lê Văn C</span>
                                        <span class="user-email">levanc@email.com</span>
                                    </div>
                                    <span class="status inactive">Không hoạt động</span>
                                </div>
                                <div class="user-item">
                                    <div class="user-avatar">PD</div>
                                    <div class="user-details">
                                        <span class="user-name">Phạm Thị D</span>
                                        <span class="user-email">phamthid@email.com</span>
                                    </div>
                                    <span class="status active">Hoạt động</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Articles -->
                    <div class="activity-card">
                        <div class="card-header">
                            <h3>Articles mới nhất</h3>
                            <p>Bài viết được tạo gần đây</p>
                        </div>
                        <div class="card-content">
                            <div class="article-list">
                                <div class="article-item">
                                    <div class="article-details">
                                        <span class="article-title">Hướng dẫn sử dụng React</span>
                                        <span class="article-author">Bởi Nguyễn Văn A</span>
                                    </div>
                                    <span class="status published">Đã xuất bản</span>
                                </div>
                                <div class="article-item">
                                    <div class="article-details">
                                        <span class="article-title">Thiết kế UI/UX hiện đại</span>
                                        <span class="article-author">Bởi Trần Thị B</span>
                                    </div>
                                    <span class="status draft">Bản nháp</span>
                                </div>
                                <div class="article-item">
                                    <div class="article-details">
                                        <span class="article-title">JavaScript ES6+ Tips</span>
                                        <span class="article-author">Bởi Lê Văn C</span>
                                    </div>
                                    <span class="status published">Đã xuất bản</span>
                                </div>
                                <div class="article-item">
                                    <div class="article-details">
                                        <span class="article-title">Node.js Best Practices</span>
                                        <span class="article-author">Bởi Phạm Thị D</span>
                                    </div>
                                    <span class="status review">Đang xem xét</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="quick-actions">
                    <div class="card-header">
                        <h3>Thao tác nhanh</h3>
                        <p>Các chức năng thường dùng</p>
                    </div>
                    <div class="actions-grid">
                        <button class="action-btn primary">
                            <i class="fas fa-user-plus"></i>
                            <span>Thêm User mới</span>
                        </button>
                        <button class="action-btn secondary">
                            <i class="fas fa-plus"></i>
                            <span>Tạo Article mới</span>
                        </button>
                        <button class="action-btn secondary">
                            <i class="fas fa-folder-plus"></i>
                            <span>Thêm Category</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const sidebarToggle = document.getElementById("sidebarToggle")
            const sidebar = document.getElementById("sidebar")
            const mainContent = document.querySelector(".main-content")

            // Toggle sidebar
            sidebarToggle.addEventListener("click", () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.toggle("open")
                } else {
                    sidebar.classList.toggle("collapsed")
                    mainContent.classList.toggle("expanded")
                }
            })

            // Handle window resize
            window.addEventListener("resize", () => {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove("open")
                } else {
                    sidebar.classList.remove("collapsed")
                    mainContent.classList.remove("expanded")
                }
            })

            // Navigation active state
            const navLinks = document.querySelectorAll(".nav-link")
            navLinks.forEach((link) => {
                link.addEventListener("click", function (e) {
                    e.preventDefault()

                    // Remove active class from all nav items
                    document.querySelectorAll(".nav-item").forEach((item) => {
                        item.classList.remove("active")
                    })

                    // Add active class to clicked item
                    this.parentElement.classList.add("active")

                    // Close sidebar on mobile after clicking
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove("open")
                    }
                })
            })

            // Close sidebar when clicking outside on mobile
            document.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                        sidebar.classList.remove("open")
                    }
                }
            })

            // Simulate real-time data updates
            function updateStats() {
                const statValues = document.querySelectorAll(".stat-content h3")
                statValues.forEach((stat) => {
                    const currentValue = Number.parseInt(stat.textContent.replace(/,/g, ""))
                    const newValue = currentValue + Math.floor(Math.random() * 10)
                    stat.textContent = newValue.toLocaleString()
                })
            }

            // Update stats every 30 seconds
            setInterval(updateStats, 30000)

            // Add smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", function (e) {
                    e.preventDefault()
                    const target = document.querySelector(this.getAttribute("href"))
                    if (target) {
                        target.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                })
            })

            // Add loading animation for action buttons
            const actionButtons = document.querySelectorAll(".action-btn")
            actionButtons.forEach((button) => {
                button.addEventListener("click", function () {
                    const originalText = this.querySelector("span").textContent
                    this.querySelector("span").textContent = "Đang xử lý..."
                    this.style.opacity = "0.7"
                    this.style.pointerEvents = "none"

                    setTimeout(() => {
                        this.querySelector("span").textContent = originalText
                        this.style.opacity = "1"
                        this.style.pointerEvents = "auto"
                    }, 2000)
                })
            })
        })

    </script>
</body>

</html>