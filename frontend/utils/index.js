export const getToken = () => {
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
};
