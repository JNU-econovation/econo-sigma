import { React, useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import Loading from '../components/common/Loading.jsx';
import MyPageCategory from '../components/common/MyPage/myPageCategory.jsx';
import MyPageTitle from '../components/common/MyPage/MyPageTitle.jsx';
import Title from '../components/common/MyPage/Title.jsx';


const StyledPage = styled.div`
    display: flex;
    justify-content: center;

    .content {
      width: 70%;
      justify-content: left;
      
      padding-top: 9em;
      
      /* margin-left: 15em; */
    }

    .myPageCategory {
      margin-top: 3em;
    }

    `;

function MyPage() {

  const bookId = useParams();

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [borrowInfo, setBorrowInfo] = useState([]);


  const getInfo = async () => {
    try {
      const getUserInfo = await fetch(`http://localhost:3001/개별회원정보`, { method: 'GET' }); // 서버에서 데이터를 가져옴
      const userInfoReturn = await getUserInfo.json(); // 응답을 JSON으로 변환
      setUserInfo(userInfoReturn); // 상태를 업데이트

      const getBorrowInfo = await fetch(`http://localhost:3001/대출이력`, { method: 'GET' }); // 서버에서 데이터를 가져옴
      const borrowInfoReturn = await getBorrowInfo.json(); // 응답을 JSON으로 변환
      setBorrowInfo(borrowInfoReturn); // 상태를 업데이트

    } catch (error) {
      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    } finally {
      setLoading(false); // 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getInfo()
  }, []);

  console.log(userInfo, borrowInfo)

  return (
    <StyledPage className="myPage">
      <div className='content'>
        <Title title={'마이페이지'}></Title>

        {loading ?
          <Loading /> :
          <MyPageTitle userInfo={userInfo} />}

        <div className='myPageCategory' >
          <MyPageCategory />
        </div>

      </div>

    </StyledPage>
  );
}



export default MyPage;
