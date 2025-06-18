<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập</title>
    <link rel="stylesheet" href="/article_management/frontend/views/userUi/css/signin.css">
</head>

<body>
    <div class="login-container">
        <div class="login-header">
            <div class="admin-icon">U</div>
            <h1 class="login-title">Đăng nhập</h1>
            <p class="login-subtitle">Vui lòng đăng nhập để truy cập trang chủ</p>
        </div>

        <form id="loginForm" method="POST">
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="user@example.com" required
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
            <div id="message"></div>

            <button type="submit" class="login-button" id="loginBtn">
                Đăng nhập
            </button>

            <div class="signin-link">
                Chưa có tài khoản?
                <a href="?controller=auth&action=signup" id="signinLink">Đăng kí ngay</a>
            </div>
        </form>
    </div>

    <script>
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
        if (token) {
            window.location.href = '?controller=article&action=index';
        }
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
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const res = await fetch('http://localhost:3000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const finalRes = await res.json();
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;

            if (finalRes?.role == 'admin') {
                const messageBox = document.getElementById('message');
                messageBox.textContent = 'Sai tài khoản hoặc mật khẩu';
                messageBox.className = 'login-message text-danger';
                setTimeout(() => {
                    document.getElementById('message').textContent = '';
                    messageBox.className = '';
                }, 3000);
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            } else if (!finalRes?.status) {
                const messageBox = document.getElementById('message');
                messageBox.textContent = finalRes.message || 'Đăng nhập thất bại.';
                messageBox.className = 'login-message text-danger';
                setTimeout(() => {
                    document.getElementById('message').textContent = '';
                    messageBox.className = '';
                }, 3000);
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            } else if (finalRes?.token) {
                const now = new Date();
                const expiry = now.getTime() + 5 * 60 * 1000;
                localStorage.setItem('token', JSON.stringify({ token: finalRes?.token, expiry }));
                window.location.href = '?controller=article&action=index';
            }
        });
    </script>
</body>

</html>