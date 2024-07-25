import styled from "styled-components"
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import { React, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../components/common/login/AuthProvider";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Title from "../components/common/Title";
import BookTable from "../components/common/tables/bookTable";


const StyledPage = styled.div`
/* background-color : aqua; */
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
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;

    const [tableLoading, setTableLoading] = useState(true);
    const [bookInfo, setBookInfo] = useState([]);




    const getBookInfo = async () => {
        if (!accessToken) {
            alert('로그인이 필요합니다.');
            navigate('/admin/login');
        }
        try {
            const response = await fetch(`http://43.202.196.181:8080/api/admin/books?page=0`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            // const response = await fetch(`http://43.202.196.181:8080/api/books?page=0`, { method: 'GET' }); // 서버에서 데이터를 가져옴

            const json = await response.json();
            setBookInfo(json);
            console.log(bookInfo)
        } catch (error) {
            console.error('Fetching books failed:', error);
            
        } finally {
            setTableLoading(false);
        }
    };

    useEffect(() => {
        getBookInfo();
    }, [accessToken]);


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
                        <Loading /> : bookInfo.data.bookInfos.length > 0 ?
                         <>
                         <BookTable response={bookInfo} />
                         <Paging response={bookInfo} />
                        </> :
                        <div>데이터가 존재하지 않습니다.</div>
                       }
                </div>
            </div>
            


        </StyledPage>

    );
}

export default BookList;