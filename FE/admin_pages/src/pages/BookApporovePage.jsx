import styled from "styled-components"
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import { React, useState, useEffect } from 'react';

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Title from "../components/common/Title";
import BookApproveTable from "../components/common/tables/bookApproveTable";
import SelectApporove from "../components/common/buttons/SelectApporove";

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

const BookApporovePage = () => {

    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;
    const [bookTableLoading, setBookTableLoading] = useState(true);
    const [bookApproveInfo, setBookApproveInfo] = useState([]);

    const getBookApproveInfo = async () => {
        try {
            const response = await fetch('http://localhost:3001/bookApproveInfo'); // 서버에서 데이터를 가져옴
            const json = await response.json(); // 응답을 JSON으로 변환
            setBookApproveInfo(json); // 상태를 업데이트
        } catch (error) {
            console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
        } finally {
            setBookTableLoading(false); // 로딩 상태를 false로 설정
        }
    };

    useEffect(() => {
        getBookApproveInfo()
    }, []);




    // useEffect(() => {
    //     getBook()
    // }, [fullLocation]);

    return (
        <StyledPage>
            <div className="contents">
                <Title title='도서승인' sub='도서의 목록을 확인하고 관리할 수 있습니다.'></Title>
                
                <div className="infotable">

                    {bookTableLoading ?
                        <Loading /> :
                        <BookApproveTable response={bookApproveInfo} />}

                </div>

                {bookTableLoading ?
                    <Loading /> :

                    <Paging response={bookApproveInfo} />}

            </div>



        </StyledPage>

    );
}

export default BookApporovePage;