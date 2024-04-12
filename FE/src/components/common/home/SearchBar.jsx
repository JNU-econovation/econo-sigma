import {React, useState} from "react";
import { IoMdSearch } from "react-icons/io";
import styled from "styled-components"
import BookList from "./BookList";
import { ReactComponent as SearchButton} from "../../../assets/searchButton.svg";

const Books = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: reapeat(2, 1fr);
    row-gap: 5em;
    margin: auto;
`;

const SearchBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80vw;
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
    
  ];

function SearchBar() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const onChange = (e) => setSearch(e.target.value);
    const Search = () => {
        const newFilteredData = data.filter(item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.writer.toLowerCase().includes(search.toLowerCase()) ||
            item.publisher.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(newFilteredData);
    };
    const onKeyUp = (e) => {
        if (e.key === 'Enter') {
          Search();
        }
      };
      
    
    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div>
                <SearchBox>
                    <SearchBtn type="button" onClick={Search}/>
                    <SearchInput type="text" value={search} onChange={onChange} onKeyUp={onKeyUp}></SearchInput>
                </SearchBox>
                <Books>
                    {filteredData.map((item) => (<BookList
                        key={item.index}
                        img={item.img}
                        title={item.title}
                        writer={item.writer}
                        publisher={item.publisher}/>
                    ))}
                </Books>
            </div>
        </div>
    );
};


export default SearchBar;