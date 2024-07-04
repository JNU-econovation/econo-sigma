import { Routes, Route, Router, useLocation } from 'react-router-dom';
import styled from "styled-components"
import BookTable from './components/common/tables/bookTable.jsx';
import BookApproveTable from './components/common/tables/bookApproveTable.jsx';
import './App.css';

import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from './components/common/header/header.jsx';
import Loading from './components/common/Loading.jsx'
import MyPageCategory from './components/common/myPageCategory.jsx';
import Title from './components/common/Title.jsx';
import UserTable from './components/common/tables/userTable.jsx';

function App() {

  const [tableLoading, setTableLoading] = useState(true);
  const [bookInfo, setBookInfo] = useState([]);

  const getBookInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin_books'); // 서버에서 데이터를 가져옴
      const json = await response.json(); // 응답을 JSON으로 변환
      setBookInfo(json); // 상태를 업데이트
    } catch (error) {
      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    } finally {
      setTableLoading(false); // 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getBookInfo()
  }, []);

  const [bookTableLoading, setBookTableLoading] = useState(true);
  const [bookApproveInfo, setBookApproveInfo] = useState([]);

  const getBookApproveInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/bookApproveInfo'); // 서버에서 데이터를 가져옴
      const json = await response.json(); // 응답을 JSON으로 변환
      setBookApproveInfo(json); // 상태를 업데이트
    } catch (error) {
      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    } finally {
      setBookTableLoading(false); // 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getBookApproveInfo()
  }, []);



  const [userTableLoading, setUserTableLoading] = useState(true);
  const [userApproveInfo, setUserApproveInfo] = useState([]);

  const getUserApproveInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/userInfo'); // 서버에서 데이터를 가져옴
      const json = await response.json(); // 응답을 JSON으로 변환
      setUserApproveInfo(json); // 상태를 업데이트
    } catch (error) {
      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    } finally {
      setUserTableLoading(false); // 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getUserApproveInfo()
  }, []);




  return (

    <div className="App">
      <MyPageCategory></MyPageCategory>
      <Title title='타이틀' sub='설명입니다. 설명입니다.'></Title>

      {userTableLoading ?
        <Loading /> :
        <UserTable response={userApproveInfo} />}

      {/* {currentLocation.pathname !== '/users/login' && <Header />} */}
      {tableLoading ?
        <Loading /> :
        <BookTable response={bookInfo} />}

      {bookTableLoading ?
        <Loading /> :
        <BookApproveTable response={bookApproveInfo} />}



    </div>


  );
}



export default App;
