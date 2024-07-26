import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/common/Loading.jsx';
import MyPageCategory from '../components/common/MyPage/myPageCategory.jsx';
import MyPageTitle from '../components/common/MyPage/MyPageTitle.jsx';
import Title from '../components/common/MyPage/Title.jsx';
import MyPageTable from '../components/common/MyPage/MyPageTable.jsx';
import { AuthContext } from '../components/login/AuthProvider';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [nowBorrowInfo, setNowBorrowInfo] = useState([]);
  const [borrowInfo, setBorrowInfo] = useState([]);

  const getInfo = async (endpoint) => {
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/users/login');
      return;
    }
    setLoading(true);
    try {
      const getUserInfo = await fetch(`http://43.202.196.181:8080/api/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const userInfoReturn = await getUserInfo.json();
      setUserInfo(userInfoReturn);

      const getBorrowInfo = await fetch(`http://43.202.196.181:8080/api/users/books/${endpoint}?page=0`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
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
    const path = location.pathname;
    console.log(path)
    if (path === '/users') {
      getInfo('now');
    } else if (path === '/users/books') {
      getInfo('all');
    }
  }, [location, accessToken]);

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