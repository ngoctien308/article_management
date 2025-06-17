<?php
class AuthController
{
    public function signin()
    {
        require_once __DIR__ . '/../views/userUi/auth/signin.php';
    }

    public function signup()
    {
        require_once __DIR__ . '/../views/userUi/auth/signup.php';
    }
}