<!-- <!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Đăng ký</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f0f2f5;
        }

        .register-form {
            max-width: 500px;
            margin: 80px auto;
            padding: 30px;
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .register-form h2 {
            margin-bottom: 25px;
            text-align: center;
        }
    </style>
</head>

<body>

    <div class="register-form">
        <h2>Đăng ký tài khoản</h2>
        <form onsubmit="signUp(event)">
            <div class="mb-3">
                <label for="name" class="form-label">Họ và tên</label>
                <input type="text" class="form-control" id="name" required>
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input type="password" class="form-control" id="password" required>
            </div>

            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
                <input type="password" class="form-control" id="confirmPassword" required>
            </div>

            <div class="mb-3">
                <div id="errorMessage" class="text-danger"></div>
                <div id="successMessage" class="text-success"></div>
            </div>

            <button class="btn btn-success w-100 mb-2">Đăng ký</button>
            <a href="?controller=auth&action=signin">Đã có tài khoản? Đăng nhập tại đây.</a>
        </form>
    </div>

    <script>
        const signUp = async e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password != confirmPassword) {
                document.getElementById('errorMessage').textContent = "Mật khẩu xác nhận chưa đúng";
            } else {
                const res = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const finalRes = await res.json();

                if (!finalRes?.status) {
                    document.getElementById('errorMessage').textContent = finalRes.message || 'Đăng kí thất bại.';
                    document.getElementById('successMessage').textContent = '';
                } else {
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('confirmPassword').value = '';
                    document.getElementById('successMessage').textContent = finalRes.message;
                    document.getElementById('errorMessage').textContent = '';
                }
            }
        }
    </script> -->



<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký tài khoản</title>
    <link rel="stylesheet" href="/article_management/frontend/views/userUi/css/signup.css">
</head>

<body>
    <div class="signup-container">
        <div class="signup-header">
            <div class="user-icon" id="userIcon">👤</div>
            <div class="success-checkmark" id="successIcon"></div>
            <h1 class="signup-title">Tạo tài khoản</h1>
            <p class="signup-subtitle">Điền thông tin để tạo tài khoản mới</p>
        </div>

        <form id="signupForm" action="#" method="POST">
            <div class="form-group">
                <label for="name" class="form-label">Họ và tên</label>
                <input type="text" id="name" name="name" class="form-input" placeholder="Nhập họ và tên" required
                    autocomplete="name">
            </div>

            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-input" placeholder="user@example.com" required
                    autocomplete="email">
            </div>

            <div class="form-group">
                <label for="password" class="form-label">Mật khẩu</label>
                <div style="position: relative;">
                    <input type="password" id="password" name="password" class="form-input"
                        placeholder="Tạo mật khẩu mạnh" required autocomplete="new-password">
                    <button type="button" class="password-toggle" onclick="togglePassword('password')">
                        👁️
                    </button>
                </div>
            </div>

            <div class="form-group">
                <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
                <div style="position: relative;">
                    <input type="password" id="confirmPassword" name="confirmPassword" class="form-input"
                        placeholder="Nhập lại mật khẩu" required autocomplete="new-password">
                    <button type="button" class="password-toggle" onclick="togglePassword('confirmPassword')">
                        👁️
                    </button>
                </div>
            </div>

            <div class="terms-checkbox">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">
                    Tôi đồng ý với <a href="#" class="terms-link">Điều khoản sử dụng</a>
                    và <a href="#" class="terms-link">Chính sách bảo mật</a>
                </label>
            </div>

            <div id="message"></div>

            <button type="submit" class="signup-button" id="signupBtn">
                Tạo tài khoản
            </button>
        </form>

        <div class="signin-link">
            Đã có tài khoản?
            <a href="?controller=auth&action=signin" id="signinLink">Đăng nhập ngay</a>
        </div>
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
        function togglePassword(fieldId) {
            const passwordInput = document.getElementById(fieldId);
            const toggleBtn = passwordInput.nextElementSibling;

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = '👁️';
            }
        }
        // Form submission
        document.getElementById('signupForm').addEventListener('submit', async e => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const signupBtn = document.getElementById('signupBtn');

            // Show loading state
            signupBtn.classList.add('loading');
            signupBtn.disabled = true;

            if (password != confirmPassword) {
                const messageBox = document.getElementById('message');
                messageBox.textContent = 'Mật khẩu xác nhận chưa đúng';
                messageBox.className = 'login-message text-danger';
                setTimeout(() => {
                    messageBox.textContent = '';
                    messageBox.className = '';
                }, 3000);
                signupBtn.classList.remove('loading');
                signupBtn.disabled = false;
            } else {
                console.log('dk')
                const res = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                const finalRes = await res.json();

                if (!finalRes?.status) {
                    const messageBox = document.getElementById('message');
                    messageBox.textContent = finalRes.message || 'Đăng kí thất bại.';
                    messageBox.className = 'login-message text-danger';
                    setTimeout(() => {
                        messageBox.textContent = '';
                        messageBox.className = '';
                    }, 3000);
                    signupBtn.classList.remove('loading');
                    signupBtn.disabled = false;
                } else {
                    // Show success state
                    document.getElementById('userIcon').style.display = 'none';
                    document.getElementById('successIcon').style.display = 'block';

                    // Hide form and show success message
                    document.getElementById('signupForm').style.display = 'none';
                    document.querySelector('.signin-link').innerHTML =
                        'Bạn có thể <a href="?controller=auth&action=signin">đăng nhập ngay</a> để sử dụng dịch vụ';
                }
            }
        });
    </script>
</body>

</html>