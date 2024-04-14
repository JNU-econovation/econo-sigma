import React from 'react';

import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import BookList from '../home/BookList';

const Books = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: reapeat(2, 1fr);
    row-gap: 5em;
    margin: auto;
`;


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
                <Books>
                    {currentBooks.map((item) => (<BookList
                        key={item.index}
                        img={item.img}
                        title={item.title}
                        writer={item.author}
                        publisher={item.publisher}/>
                    ))}
                </Books>
            <div>
                <button onClick={goToFirstPage}>&lt;&lt;</button>
                <button onClick={handlePrevList}>&lt;</button>
                {renderPageNumbers()}
                <button onClick={handleNextList}>&gt;</button>
                <button onClick={goToLastPage}>&gt;&gt;</button>
            </div>
        </div>
      );
    };

export default Paging