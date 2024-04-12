import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";



const StyledPagination = styled.div`
    .pagination {
        display: flex;
        justify-content:center ;
        
    }
    
    ul {
        list-style : none;
    }

    li{
        width : 2em;
    }

    a {
        text-decoration : none;
        color : black;
    }


`
const Paging = () => {

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  
  return (
    <StyledPagination>
        <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={450} // 총 아이템 갯수
        pageRangeDisplayed={10} // paginator의 페이지 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
        />
    </StyledPagination>

  );
};

export default Paging;