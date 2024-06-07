import { React, useState, useEffect } from "react";
import styled from "styled-components"
import BookList from "./BookList";
import { ReactComponent as SearchButton } from "../../../assets/searchButton.svg";
import { useParams, useSearchParams } from "react-router-dom";

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
    }
    ;
`

const SearchBtn = styled(SearchButton)`
    width: 2.5em;
    height: 2.5em;

`;


function SearchBar() {
    const [search, setSearch] = useState("");
    const onChange = (e) => setSearch(e.target.value);
    const [searchParams, setSearchParams] = useSearchParams();


    const Search = () => {
        // 현재 URL의 searchParams 객체를 가져옵니다
        const currentCategory = searchParams.get('category');

        // 새로운 파라미터 객체를 만듭니다
        const params = {
            keyword: search,
            page: 1,
        };

        // 카테고리가 존재하면 파라미터 객체에 추가합니다
        if (currentCategory) {
            params.category = currentCategory;
        }

        // setSearchParams 함수를 호출하여 URL 파라미터를 설정합니다
        setSearchParams(params);
};

const onKeyUp = (e) => {
    if (e.key === 'Enter') {
        Search();
    }
};


return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "3em", marginLeft: "5em" }}>
        <div>
            <SearchBox>
                <SearchBtn type="button" onClick={Search} />
                <SearchInput type="text" value={search} onChange={onChange} onKeyUp={onKeyUp}></SearchInput>
            </SearchBox>
        </div>
    </div>
);
};


export default SearchBar;