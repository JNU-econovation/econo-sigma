import { Routes, Route, Router, useLocation} from 'react-router-dom';

import './App.css';
import React from 'react';

import Header from './components/common/header/header.jsx';
import Category from './components/common/Category.jsx';
import Main from './pages/main';
import Login from './pages/login';

function App() {
  const currentLocation = useLocation();

  return (
    <div className="App">
      {currentLocation.pathname !== '/users/login' && <Header />}
      {currentLocation.pathname.startsWith('/books') && <Category/>}
      <Routes>
        <Route path="/books" element={<Main/>}/>
        <Route path="/users/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
