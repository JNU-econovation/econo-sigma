import React from 'react';

import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";


const StyledPagination = styled.div`
    button {
        border: none;
        background-color: white;
        font-size: 0.9em;
        font-weight: 600;
        color : #4D4ABF;


    &.active {
      color: #FB8500;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;}
        
    }
    
    ul {
        list-style : none;
    }

    li{
        width : 2em;
    }



`

const Paging = ({ response }) => {
  const pageListSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = response.data.pageInfo.totalPages;
  const currentListIndex = Math.floor((currentPage - 1) / pageListSize);


  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  
  const location = useLocation();
  const fullLocation = `${location.pathname}${location.search}${location.hash}`;

// 데이터 받아오기

//   const [loading, setLoading] = useState(true);
//   const [book, setBook] = useState([]);


//   const getBook = async () => {
//     try {
//         const response = await fetch('http://localhost:3001/db'); // 서버에서 데이터를 가져옴
//         const json = await response.json(); // 응답을 JSON으로 변환
//         setBook(json); // 상태를 업데이트
//     } catch (error) {
//         console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
//     } finally {
//         setLoading(false); // 로딩 상태를 false로 설정
//     }
// };


//   useEffect(() => {
//     getBook()
//   }, []);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });


  };

  const handleNextList = () => {
    const nextListFirstPage = (currentListIndex + 1) * pageListSize + 1;
    if (nextListFirstPage <= totalPages) {
      setCurrentPage(nextListFirstPage);
    }
  };
  const handlePrevList = () => {
    const prevListFirstPage = Math.max(1, currentListIndex * pageListSize);
    setCurrentPage(prevListFirstPage);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const renderPageNumbers = () => {
    const startPage = currentListIndex * pageListSize + 1;
    const endPage = Math.min(startPage + pageListSize - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={currentPage === pageNumber ? 'active' : ''}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div>
      {/* 이 부분에 map을 통해서 각 페이지의 book 을 리턴해주어야함
           현재는 book 컴포넌트 수정에 대한 논의가 이루어지고 있어서 비워두었습니다! */}
      <StyledPagination>
        <button onClick={goToFirstPage}>&lt;&lt;</button>
        <button onClick={handlePrevList}>&lt;</button>
        {renderPageNumbers()}
        <button onClick={handleNextList}>&gt;</button>
        <button onClick={goToLastPage}>&gt;&gt;</button>
      </StyledPagination>
    </div>
  );
};

export default Paging