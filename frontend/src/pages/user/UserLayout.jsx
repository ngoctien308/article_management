import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/user/Header';
import { AuthContext } from '../../auth/AuthContext';

const UserLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/user/signin');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  );
};

export default UserLayout;
