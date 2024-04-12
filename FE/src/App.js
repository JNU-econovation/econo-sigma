<<<<<<< HEAD
import Category from "./components/common/Category";
import SearchBar from "./components/common/home/SearchBar";
import Detail from "./components/common/Detail";
import BookList from "./components/common/home/BookList";

function App() {
  return (
    <div className="App">
      
      <Category/>
      <SearchBar/>
      <Detail/>
      
      {/*<SearchBar />*/}
      {/*<BookList img="" title="book" writer="작가" publisher="출판사"/>*/}
  
=======
import { Routes, Route} from 'react-router-dom';

import './App.css';
import React from 'react';

import Header from './components/common/header/header.jsx';
import Login from './pages/login.jsx'
import InfoTable from './components/common/infoList/infoTable.jsx'
import Paging  from './components/common/paginations/pagination.jsx';

function App() {

  
  
  return (
    <div className="App">
>>>>>>> cb6517eeee295531a4a54bccd003862bbcb0dd33

    </div>
  );
}

export default App;
