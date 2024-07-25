

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/login/AuthProvider';
import Header from './components/common/header/header.jsx';
import Main from './pages/main';
import Login from './pages/login';
import Book from './pages/book.jsx';
import MyPage from './pages/MyPage.jsx';
import PrivateRoute from './components/login/PrivateRoute.jsx';
import Category from './components/common/Category.jsx';
import Form from './components/common/Form';

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
          <Route path="/users/form" element={<Form/>}/>

        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;