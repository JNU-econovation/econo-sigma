import {React, useState, useEffect} from "react";
import styled from "styled-components"
import BookList from "./BookList";
import { ReactComponent as SearchButton} from "../../../assets/searchButton.svg";
import { useParams } from "react-router-dom";

const Books = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 5em;
    margin: auto;
`;

const SearchBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 4em;
    border-radius: 3em;
    background-color: #fff;
    border: 0.15em solid transparent;
    background-image: linear-gradient(#fff, #fff),linear-gradient(to right,#4D4ABF,#FB8500);
    border-image-slice: 1;
    background-origin: border-box;
    background-clip: content-box, border-box;
    margin-bottom: 5em;

`;

const SearchInput = styled.input`
    width: 90%;
    font-size: 1.3em;
    margin-left: 0.7em;
    background: transparent;
    border: none;
    -webkit-appearance: none;
    &:focus {
        outline: none;
        cursor: text;
    }
    ;
`

const SearchBtn = styled(SearchButton)`
    width: 2.5em;
    height: 2.5em;

`;

/* 예시 데이터 (데이터 베이스 이용전 사용할)
const data = [
    {
        index: 1,
        img: 'book1.jpg',
        title: 'The Great Gatsby',
        writer: 'F. Scott Fitzgerald',
        publisher: 'Scribner'
      },
      { 
        index: 2,
        img: 'book2.jpg',
        title: 'To Kill a Mockingbird',
        writer: 'Harper Lee',
        publisher: 'J.B. Lippincott & Co.'
      },
      {
        index: 3,
        img: 'book3.jpg',
        title: '1984',
        writer: 'George Orwell',
        publisher: 'Secker & Warburg'
      },
      {
        index: 4,
        img: 'book4.jpg',
        title: '1984',
        writer: 'George Orwell',
        publisher: 'Secker & Warburg'
      },
    
  ];*/

function SearchBar() {
    const {category_id} =useParams();
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const onChange = (e) => setSearch(e.target.value);
    const [book, setBook] = useState([]);
    const getBook = async () => {
        try {
            //const response = await fetch('http://192.168.113.188:8080/books'); 
            const response = await fetch(`http://경로/백엔드에서 지정한 카테고리명?=${category_id}`)// 각 카테고리마다의 데이터를 가져옴
            const json = await response.json(); // 응답을 JSON으로 변환
            setBook(json); // 상태를 업데이트
        } catch (error) {
            console.error('Fetching books failed:', error); // 오류가 발생한 경우 콘솔에 오류 메시지 출력
        } 
    };
   

    const Search = () => {
        const newFilteredData = book.data.books.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toLowerCase()) ||
            item.publisher.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(newFilteredData);
    };
    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
          Search();
        }
      };
      
      useEffect(() => {
        getBook()
    },[]);

    return (
        <div style={{display:"flex", justifyContent: "center", marginTop:"3em", marginLeft:"5em"}}>
            <div>
                <SearchBox>
                    <SearchBtn type="button" onClick={Search}/>
                    <SearchInput type="text" value={search} onChange={onChange} onKeyUp={onKeyUp}></SearchInput>
                </SearchBox>
                <Books>
                    {filteredData.map((item) => (<BookList
                        key={item.id}
                        img={item.img}// 변수명 바꿔야할 수도..
                        title={item.title}
                        writer={item.author}
                        publisher={item.publisher}/>
                    ))}
                </Books>
            </div>
        </div>
    );
};


export default SearchBar;