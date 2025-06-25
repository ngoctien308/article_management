import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './auth/AuthContext';
import 'react-confirm-alert/src/react-confirm-alert.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>
  </AuthProvider>
);
