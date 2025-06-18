<?php
class ArticleController
{
    public function index()
    {
        if (!isset($_GET['mode']) || $_GET['mode'] != 'admin') {
            require_once __DIR__ . '/../views/userUi/articles/index.php';
        }
    }

    public function detail()
    {
        if (!isset($_GET['mode']) || $_GET['mode'] != 'admin') {
            require_once __DIR__ . '/../views/userUi/articles/detail.php';
        }
    }

    public function myArticles()
    {
        if (!isset($_GET['mode']) || $_GET['mode'] != 'admin') {
            require_once __DIR__ . '/../views/userUi/articles/myArticles.php';
        }
    }

    public function add()
    {
        if (!isset($_GET['mode']) || $_GET['mode'] != 'admin') {
            require_once __DIR__ . '/../views/userUi/articles/add.php';
        }
    }

    public function edit()
    {
        if (!isset($_GET['mode']) || $_GET['mode'] != 'admin') {
            require_once __DIR__ . '/../views/userUi/articles/edit.php';
        }
    }
}