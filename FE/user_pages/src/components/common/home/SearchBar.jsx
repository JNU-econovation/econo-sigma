import { React, useState, useEffect } from "react";
import styled from "styled-components"
import BookList from "./BookList";

import { ReactComponent as SearchButton} from "../../../assets/searchButton.svg";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

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
    width: 67vw;
    height: 3.3em;
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
    };
`;
const SearchBtn = styled(SearchButton)`
    width: 2.5em;
    height: 2.5em;
`;


function SearchBar() {

    const [keyword, setKeyword] = useState("");
    //const [filteredData, setFilteredData] = useState([]);
    const onChange = (e) => setKeyword(e.target.value);
    const [book, setBook] = useState([]);
    
    const getFilteredBook = async () => {
        <Link to={`http://localhost:3000/books/all/search?keyword=${keyword}&page=1`}></Link>
    };

    
    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
          getFilteredBook();
        }
      };

    return (
        <div style={{display:"flex", justifyContent: "center", marginTop:"3em", marginLeft:"5em"}}>
            <div>
                <SearchBox>
                    <SearchBtn type="button" onClick={getFilteredBook}/>
                    <SearchInput type="text" value={keyword} onChange={onChange} onKeyUp={onKeyUp}></SearchInput>
                </SearchBox>
                {/* <Books>
                    {book.data.books.map((item) => (<BookList
                        key={item.id}
                        img={item.img} // 변수명 바꿔야할 수도..
                        title={item.title}
                        author={item.author}
                        publisher={item.publisher}/>
                    ))}
                </Books> */}
            </div>
        </div>
);
};


export default SearchBar;