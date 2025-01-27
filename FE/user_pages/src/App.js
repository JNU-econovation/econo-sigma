

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/login/AuthProvider';
import Header from './components/header/Header';
import Main from './pages/Main';
import Login from './pages/Login.jsx';
import Book from './pages/BookDetail.jsx';
import MyPage from './pages/MyPage.jsx';
import PrivateRoute from './components/login/PrivateRoute.jsx';
import Category from './components/common/Category.jsx';
import Form from './components/common/Form.jsx';


const App = () => {
  const currentLocation = useLocation();

  return (
    <AuthProvider>
      <div className="App">
        {currentLocation.pathname !== '/users/login' && <Header />}
        {currentLocation.pathname.startsWith('/books') && <Category />}

        <Routes>
          <Route path="/books/*" element={<Main />} />
          <Route path="/books/all" element={<Main />} />
          <Route path="/books/category/*" element={<Main />} />
          <Route path="/books/search/*" element={<Main />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/users" element={<MyPage />} />
          <Route path="/users/book" element={<MyPage />} />
          <Route path="/bookApplication" element={<Form />} />


        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;