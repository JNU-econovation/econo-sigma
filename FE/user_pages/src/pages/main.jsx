import SearchBar from "../components/common/home/SearchBar";
import Category from "../components/common/Category";

import styled from "styled-components"
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import { React, useState, useEffect } from 'react';
import BookList from "../components/common/home/BookList";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Books = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 5em;
    margin: auto;
    margin-bottom: 3em;
`;

const StyledPage = styled.div`
    padding-bottom: 3em;

    .contents {
      padding-top: 9em;
      margin-left: 15em;
    }
    .infotable {
      margin-top: 3em;
    }
    `;

const Main = () => {

    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;

    console.log(`43.202.196.181:8080/${fullLocation}`)
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState([]);


    const getBook = async () => {
        setLoading(true);

        try {
            const response = await fetch(`43.202.196.181:8080${fullLocation}`); // 서버에서 데이터를 가져옴
            const json = await response.json(); // 응답을 JSON으로 변환
            setBook(json); // 상태를 업데이트
        } catch (error) {
            console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
        } finally {
            setLoading(false); // 로딩 상태를 false로 설정
        }
    };


    useEffect(() => {
        getBook()
    }, [fullLocation]);

    return (
        <StyledPage>
            <div className="contents">
                {loading ?
                    <Loading /> :
                    <SearchBar /> }
                
                {loading ?
                    <Loading /> :
                    <Books>
                        {book.data.books.map((item) => (<BookList
                            key={item.id}
                            img={item.img} // 변수명 바꿔야할 수도..
                            title={item.title}
                            author={item.author}
                            publisher={item.publisher} />
                        ))}
                    </Books>
                }

                {loading ?
                    <Loading /> :

                    <Paging response={book} />}
            </div>
        </StyledPage>

    );
}

export default Main;