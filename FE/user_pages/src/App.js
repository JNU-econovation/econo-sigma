import { Routes, Route, Router, useLocation} from 'react-router-dom';
import styled from "styled-components"

import './App.css';

import {React, useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/header/header.jsx';
import Category from './components/common/Category.jsx';
import Main from './pages/main';
import Login from './pages/login';
import Loading from './components/common/Loading.jsx';
import Paging from './components/common/pagination.jsx';

import Book from './pages/book.jsx'
import RegisterMember from './pages/RegisterMember';
import MyPage from './pages/MyPage.jsx';




function App() {
  const currentLocation = useLocation();

  const params = useParams();

  return (
    <div className="App">
      {currentLocation.pathname !== '/users/login' && <Header />}
      {currentLocation.pathname.startsWith('/books') && <Category/>}



      <Routes>
        <Route path="/books/*" element={<Main/>}/>
        <Route path="/books/all" element={<Main/>}/>
        <Route path="/books/category/*" element={<Main/>}/>
        <Route path="/books/search/*" element={<Main/>}/>
        <Route path="/users/login" element={<Login/>}/>
        <Route path="/admin/users" element={<RegisterMember/>}/>
        <Route path="/books/:id" element={<Book/>}></Route>
        <Route path="/users/:id" element={<MyPage/>}></Route>

      </Routes>


      
    </div>


  );
}



export default App;
