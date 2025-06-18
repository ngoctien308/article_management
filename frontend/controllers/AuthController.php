<?php
class AuthController
{
    public function signin()
    {
        if (isset($_GET['mode']) && $_GET['mode'] == 'admin')
            require_once __DIR__ . '/../views/adminUi/auth/signin.php';
        else
            require_once __DIR__ . '/../views/userUi/auth/signin.php';
    }

    public function signup()
    {
        require_once __DIR__ . '/../views/userUi/auth/signup.php';
    }
}