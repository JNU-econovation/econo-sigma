import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/common/Loading.jsx';
import MyPageCategory from '../components/common/MyPage/myPageCategory.jsx';
import MyPageTitle from '../components/common/MyPage/MyPageTitle.jsx';
import Title from '../components/common/MyPage/Title.jsx';
import MyPageTable from '../components/common/MyPage/MyPageTable.jsx';
import { AuthContext } from '../components/login/AuthProvider';

const StyledPage = styled.div`
  display: flex;
  justify-content: center;

  .mypageTitle{
    margin-left: 0.2rem;
  }

  .content {
    width: 70%;
    justify-content: left;
    padding-top: 9em;
  }

  .myPageCategory {
    margin-top: 2.5rem;
  }
`;

function MyPage() {
  const bookId = useParams();
  const { accessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [borrowInfo, setBorrowInfo] = useState([]);

  const getInfo = async () => {
    try {
      const getUserInfo = await fetch(`http://localhost:3001/개별회원정보`, {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${accessToken}`,
        //   'Content-Type': 'application/json',
        // },
      });
      const userInfoReturn = await getUserInfo.json();
      setUserInfo(userInfoReturn);

      const getBorrowInfo = await fetch(`http://localhost:3001/대출이력`, {
        method: 'GET',
        // headers: {
        //   'Authorization': `Bearer ${accessToken}`,
        //   'Content-Type': 'application/json',
        // },
      });
      const borrowInfoReturn = await getBorrowInfo.json();
      setBorrowInfo(borrowInfoReturn);
    } catch (error) {
      console.error('Fetching books failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  console.log(userInfo, borrowInfo);

  return (
    <StyledPage className="myPage">
      <div className='content'>
        <div className='mypageTitle'>
          <Title title={'마이페이지'}></Title>
          {loading ? <Loading /> : <MyPageTitle userInfo={userInfo} />}
        </div>
        <div className='myPageCategory'>
          <MyPageCategory />
        </div>
        <div>
          {loading ? <Loading /> : <MyPageTable response={borrowInfo} />}
        </div>
      </div>
    </StyledPage>
  );
}

export default MyPage;