import styled from "styled-components"
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import { React, useState, useEffect } from 'react';

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Title from "../components/common/Title";
import BookTable from "../components/common/tables/bookTable";


const StyledPage = styled.div`
    padding-top: 1.5em;

    .contents {
      padding-top: 9em;
      margin-left: 17em;
    }

    .infotable {
      margin-top: 2em;
    }
    `;

const BookList = () => {

    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;

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




    console.log(bookInfo)

    // useEffect(() => {
    //     getBook()
    // }, [fullLocation]);

    return (
        <StyledPage>
            <div className="contents">

                <Title title='도서관리' sub='도서의 목록을 확인하고 관리할 수 있습니다.'></Title>
                <div className="infotable">
                    {tableLoading ?
                        <Loading /> :
                        <BookTable response={bookInfo} />}

                </div>
                {tableLoading ?
                    <Loading /> :

                    <Paging response={bookInfo} />}

            </div>
            


        </StyledPage>

    );
}

export default BookList;