<!DOCTYPE html>
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
    </script>