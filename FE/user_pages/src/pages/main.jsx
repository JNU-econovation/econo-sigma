import SearchBar from "../components/common/home/SearchBar";
import Category from "../components/common/Category";
import Paging from "../components/common/pagination";
import Loading from "../components/common/Loading";
import {React, useState , useEffect} from 'react';

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Main = () => {

    const location = useLocation();
    const fullLocation = `${location.pathname}${location.search}${location.hash}`;

    console.log(`http://localhost:3001${fullLocation}`)
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState([]);


    const getBook = async () => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3001/db`); // 서버에서 데이터를 가져옴
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
    console.log(book)

    return (
        <div>
           <SearchBar/>
        </div>
    );
}

export default Main;