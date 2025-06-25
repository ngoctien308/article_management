import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/user/SignUp';
import ArticleList from './components/user/ArticleList';
import AddArticle from './components/user/AddArticle';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import ArticleDetail from './components/user/ArticleDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/user/signin' replace />} />
        <Route path='/user'>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path='articles/:id' element={<ArticleDetail />} />
            <Route path='articles' element={<ArticleList />} />
            <Route path='add' element={<AddArticle />} />
          </Route>
        </Route>

        <Route path='/admin'>
          <Route index element={<Navigate to='signin' replace />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
