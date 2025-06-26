import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/user/SignUp';
import ArticleList from './components/user/ArticleList';
import AddArticle from './components/AddArticle';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import ArticleDetail from './components/user/ArticleDetail';
import MyArticle from './components/user/MyArticle';
import EditArticle from './components/EditArticle';
import Users from './components/admin/Users';
import Articles from './components/admin/Articles';
import EditUser from './components/admin/EditUser';
import AddUser from './components/admin/AddUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/user/signin' replace />} />
        {/* User */}
        <Route path='/user'>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path='articles/:id' element={<ArticleDetail />} />
            <Route path='articles' element={<ArticleList />} />
            <Route path='add' element={<AddArticle />} />
            <Route path='my-articles' element={<MyArticle />} />
            <Route path='edit-articles/:id' element={<EditArticle />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route path='/admin'>
          <Route index element={<Navigate to='signin' replace />} />
          <Route path='signin' element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<Users />} />
            <Route path='users/add' element={<AddUser />} />
            <Route path='users/edit/:id' element={<EditUser />} />
            <Route path='articles' element={<Articles />} />
            <Route path='articles/add' element={<AddArticle />} />
            <Route path='articles/edit/:id' element={<EditArticle />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
