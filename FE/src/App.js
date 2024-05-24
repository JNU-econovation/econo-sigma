import { Routes, Route, Router, useLocation} from 'react-router-dom';

import './App.css';

import {React, useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/header/header.jsx';
import Category from './components/common/Category.jsx';
import Main from './pages/main';
import Login from './pages/login';
import Loading from './components/common/Loading.jsx';
//import Paging from './components/common/pagination.jsx';

import Book from './pages/book.jsx';

function App() {
  const currentLocation = useLocation();

  //const [loading, setLoading] = useState(true);
  //const [book, setBook] = useState([]);


  //const getBook = async () => {
    //try {
       // const response = await fetch('http://localhost:3001/db'); // 서버에서 데이터를 가져옴
        //const json = await response.json(); // 응답을 JSON으로 변환
        //setBook(json); // 상태를 업데이트
  //  } catch (error) {
  //      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
  //  } finally {
    //    setLoading(false); // 로딩 상태를 false로 설정
   // }
//};


  //useEffect(() => {
  //  getBook()
  //}, []);

    //const params = useParams();

  return (
    <div className="App">
      {currentLocation.pathname !== '/users/login' && <Header />}
      {currentLocation.pathname.startsWith('/books') && <Category/>}
      {/* {loading ?
                <Loading/> :
      <Paging response = {book}/> } */}

      <Routes>
        <Route path="/books" element={<Main/>}/>
        <Route path="/users/login" element={<Login/>}/>
        {/*<Route path="/books/:id" element={<Book/>}></Route>*/}
      </Routes>

      
    </div>
  );
}



export default App;
