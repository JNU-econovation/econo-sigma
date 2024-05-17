import React from 'react';

import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import axios, { AxiosResponse } from 'axios';

const StyledPagination = styled.div`
    button {
        border: none;
        background-color: white;
        font-size: 0.9em;
        font-weight: 600;
        color : #4D4ABF;
        
    }
    
    ul {
        list-style : none;
    }

    li{
        width : 2em;
    }



`

const Paging = ({response}) => {
    const books = response.data.books ; 
    const itemsPerPage = 8;
    const pageListSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = response.data.pageInfo.totalPages;
    const currentListIndex = Math.floor((currentPage - 1) / pageListSize);

    const currentBooks = books ;    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
            disabled={currentPage === pageNumber}
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