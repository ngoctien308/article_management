import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import AdminPage from './pages/admin/AdminLayout';
import SignIn from './components/SignIn';
import SignUp from './components/user/SignUp';
import UserLayout from './pages/user/UserLayout';
import ArticleList from './components/user/ArticleList';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 👉 Khi vào "/" thì điều hướng sang "/user" */}
        <Route path='/' element={<Navigate to='/user' />} />

        <Route path='/user'>
          <Route path='' element={<Navigate to='signin' />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />

          <Route path='' element={<UserLayout />}>
            <Route path='articles' element={<ArticleList />} />
          </Route>
        </Route>

        <Route path='/admin'>
          <Route path='' element={<Navigate to='signin' />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='home' element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
