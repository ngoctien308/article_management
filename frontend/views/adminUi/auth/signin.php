<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập Admin</title>
    <link rel="stylesheet" href="/article_management/frontend/views/adminUi/css/signin.css">

</head>

<body>
    <div class="login-container">
        <div class="login-header">
            <div class="admin-icon">A</div>
            <h1 class="login-title">Đăng nhập Admin</h1>
            <p class="login-subtitle">Vui lòng đăng nhập để truy cập trang quản trị</p>
        </div>

        <form id="loginForm" action="#" method="POST">
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="admin@example.com" required
                    autocomplete="email">
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Mật khẩu</label>
                <div style="position: relative;">
                    <input type="password" id="password" name="password" class="form-input" placeholder="Nhập mật khẩu"
                        required autocomplete="current-password">
                    <button type="button" class="password-toggle" onclick="togglePassword()">
                        👁️
                    </button>
                </div>
            </div>

            <button type="submit" class="login-button" id="loginBtn">
                Đăng nhập
            </button>
        </form>

        <div class="security-notice">
            <div class="security-notice-title">🔒 Bảo mật</div>
            <div class="security-notice-text">
                Trang này chỉ dành cho quản trị viên. Mọi hoạt động đăng nhập đều được ghi lại và giám sát.
            </div>
        </div>
    </div>

    <script>
        // Toggle password visibility
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleBtn = document.querySelector('.password-toggle');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }

        // Form submission with loading state
        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const loginBtn = document.getElementById('loginBtn');
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validation
            if (!email || !password) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            // Show loading state
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;

            // Simulate login process
            setTimeout(() => {
                loginBtn.classList.remove('loading');
                loginBtn.disabled = false;

                // Here you would normally send the data to your server
                alert('Đăng nhập thành công! (Demo)');

                // Redirect to admin dashboard
                window.location.href = '?mode=admin&controller=dashboard&action=index';
            }, 2000);
        });
    </script>
</body>

</html>