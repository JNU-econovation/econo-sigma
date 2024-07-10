import { React, useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';


import InfoTable from '../components/common/infoList/infoTable.jsx'
import Loading from '../components/common/Loading.jsx';
import Detail from '../components/common/Detail.jsx'


const StyledPage = styled.div`

    .contents {
      padding-top: 9em;
      margin-left: 15em;
    }
    .infotable {
      margin-top: 3em;
    }
    `;

function Book() {

  const bookId = useParams();
  console.log(bookId.id)

  const [tableLoading, setTableLoading] = useState(true);
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/info`, {method: 'GET'}); // 서버에서 데이터를 가져옴
      const json = await response.json(); // 응답을 JSON으로 변환
      setInfo(json); // 상태를 업데이트
    } catch (error) {
      console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
    } finally {
      setTableLoading(false); // 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    getInfo()
  }, []);


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



export default Book;
