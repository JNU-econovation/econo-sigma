import { React, useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';

import InfoTable from '../components/bookDetail/InfoTable.jsx';
import Loading from '../components/common/Loading.jsx';
import Detail from '../components/common/Detail.jsx'


const StyledPage = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

    .contents {
      width: 80%;
      padding-top: 9em;
      margin-left: 15em;
    }

    .detail{
      margin-left: 5%;
      width: 100%;
    }

    .infotable {
      margin-top: 3em;
  
    }
    `;

function BookDetail() {

  const bookId = useParams();
  console.log(bookId.id)

  const [tableLoading, setTableLoading] = useState(true);
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
    try {
      const response = await fetch(`http://43.202.196.181:8080/api/books/${bookId.id}`, { method: 'GET' }); // 서버에서 데이터를 가져옴
      const json = await response.json(); 
      setInfo(json);
    } catch (error) {
      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    } finally {
      setTableLoading(false); // 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getInfo()
  }, []);

  console.log(info)
  return (
    <StyledPage className="book">
      <div className='contents'>
        <div className='detail'>

          {tableLoading ?
            <Loading /> :
            <Detail book={info.data} ></Detail>
          }
        </div>
        <div className="infotable">
          {tableLoading ?
            <Loading /> :
            <InfoTable response={info} />}
        </div>
      </div>

    </StyledPage>
  );
}



export default BookDetail;