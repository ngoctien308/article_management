<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Đăng nhập</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }

        .login-form {
            max-width: 400px;
            margin: 80px auto;
            padding: 30px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .login-form h2 {
            margin-bottom: 20px;
            text-align: center;
        }
    </style>
</head>

<body>

    <div class="login-form">
        <h2>Đăng nhập</h2>
        <form onsubmit="signIn(event)">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <input type="password" class="form-control" id="password" required>
            </div>
            <div id="message" class="text-danger mb-3"></div>
            <button class="btn btn-primary w-100 mb-2">Đăng nhập</button>
            <a href="?controller=auth&action=signup">Chưa có tài khoản? Đăng ký tại đây.</a>
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

        const signIn = async e => {
            e.preventDefault();
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

            if (!finalRes?.status) {
                document.getElementById('message').textContent = finalRes.message || 'Đăng nhập thất bại.';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
            } else if (finalRes?.token) {
                const now = new Date();
                const expiry = now.getTime() + 5 * 60 * 1000;
                localStorage.setItem('token', JSON.stringify({ token: finalRes?.token, expiry }));
                window.location.href = '?controller=article&action=index';
            }
        }
    </script>