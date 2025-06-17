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

    public function myArticles()
    {
        require_once __DIR__ . '/../views/userUi/articles/myArticles.php';
    }

    public function edit()
    {
        require_once __DIR__ . '/../views/userUi/articles/edit.php';
    }
}