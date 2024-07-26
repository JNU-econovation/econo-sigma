import styled from "styled-components";
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Title from "../components/common/Title";
import BookApproveTable from "../components/common/tables/bookApproveTable";
import { AuthContext } from "../components/common/login/AuthProvider";

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

const BookApprovePage = () => {
    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;
    const [bookTableLoading, setBookTableLoading] = useState(true);
    const [bookApproveInfo, setBookApproveInfo] = useState([]);
    const navigate = useNavigate();
    const { accessToken } = useContext(AuthContext);

    const getBookApproveInfo = async () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            navigate('/admin/login');
        }
        try {
            const response = await fetch(`http://43.202.196.181:8080/api${fullLocation}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setBookApproveInfo(json);
            console.log(bookApproveInfo)
        } catch (error) {
            console.error('Fetching books failed:', error);

        } finally {
            setBookTableLoading(false);
        }
    };

    useEffect(() => {
        getBookApproveInfo();
    }, [accessToken]);


    return (
        <StyledPage>
            <div className="contents">
                <Title title='도서승인' sub='도서의 목록을 확인하고 관리할 수 있습니다.'></Title>
                <div className="infotable">
                    {bookTableLoading ? <Loading /> : bookApproveInfo.data.bookApproveInfos.length > 0 ?

                        <>
                            <BookApproveTable response={bookApproveInfo} />
                            <Paging response={bookApproveInfo} />
                        </> :
                        <div> 데이터가 존재하지 않습니다. </div>
                    }
                </div>
            </div>
        </StyledPage>
    );
}

export default BookApprovePage;