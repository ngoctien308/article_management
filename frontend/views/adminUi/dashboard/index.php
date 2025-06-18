<h1>Dashboard</h1>

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
    if (!token) {
        window.location.href = '?mode=admin&controller=auth&action=signin';
    }
</script>