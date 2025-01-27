import Category from "../components/common/Category";
import SearchBar from "../components/home/SearchBar";
import styled from "styled-components"
import Loading from "../components/common/Loading";
import { React, useState, useEffect } from 'react';
import BookList from "../components/home/BookList";
import Pagination from "../components/common/Pagination";
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
    /* justify-content: center; */

    .contents {
      padding-top: 9em;
      margin-left: 15em;
    }
    .infotable {
      margin-top: 3em;
    }
    .message {
        margin-top: 3em;
        margin-left: 5%;
        display: flex;
        justify-content: center;
    }
    `;


const Main = () => {

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const newKeyword = searchParams.get('keyword') ? decodeURIComponent(searchParams.get('keyword')) : '';

    const fullLocation = `${location.pathname}${location.search}${location.hash}`;
    const searchLocation = `${location.pathname}?keyword=${newKeyword}${location.hash}`;
    const apiUrl = searchParams.has('keyword') ? searchLocation : fullLocation;

    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState([]);


    const getBook = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://43.202.196.181:8080/api${apiUrl}`, { method: 'GET' }); // 서버에서 데이터를 가져옴

            const json = await response.json(); 
            setBook(json);
        } catch (error) {
            console.error('Fetching books failed:', error); 
        } finally {
            setLoading(false);
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
                    <SearchBar />}

                {loading ?
                    <Loading /> :
                    book.data.bookInfos.length > 0 ?
                        <>
                            <Books>
                                {book.data.bookInfos.map((item) => (<BookList

                                    data={item}
                                    key={item.id}
                                    img={item.imageURL} // 변수명 바꿔야할 수도..
                                    title={item.title}
                                    author={item.author}
                                    publisher={item.publisher} />
                                ))}
                            </Books>
                            <Pagination response={book} />
                        </>

                        :
                        <div className="message">해당되는 도서가 존재하지 않습니다.</div>

                }
            </div>
        </StyledPage>

    );
}

export default Main;