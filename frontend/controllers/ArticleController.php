<?php
class ArticleController
{
    public function index()
    {
        require_once __DIR__ . '/../views/userUi/articles/index.php';
    }

    public function detail()
    {
        require_once __DIR__ . '/../views/userUi/articles/detail.php';
    }
}